from contextlib import asynccontextmanager
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict
import spacy

nlp = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global nlp
    nlp = spacy.load("en_core_web_lg")
    skill_pattern_path = "jz_skill_patterns.jsonl"

    ruler = nlp.add_pipe("entity_ruler")
    ruler.from_disk(skill_pattern_path)
    yield
    nlp.remove_pipe("entity_ruler")


app = FastAPI(lifespan=lifespan)


class Candidate(BaseModel):
    id: str
    description: str
    skills: List[str]


class Vacancy(BaseModel):
    description: str
    skills: List[str]


def get_matched_candidates(vacancy_skills: List[str], candidates: List[Candidate]):
    vectorizer = TfidfVectorizer()
    all_texts = [" ".join(vacancy_skills)] + [" ".join(unique_skills(get_skills(c.description) + c.skills)) for c in
                                              candidates]
    vectors = vectorizer.fit_transform(all_texts)

    num_clusters = 2
    kmeans = KMeans(n_clusters=num_clusters, random_state=42, n_init=10)
    clusters = kmeans.fit_predict(vectors)

    vacancy_cluster = clusters[0]

    similarities = cosine_similarity(vectors[0:1], vectors[1:])[0]

    matched_candidates = [
        (candidates[i], round(similarities[i] * 100, 2))
        for i in range(len(candidates))
        if clusters[i + 1] == vacancy_cluster
    ]

    matched_candidates.sort(key=lambda x: -x[1])

    return matched_candidates


def get_skills(text):
    doc = nlp(text)
    myset = []
    subset = []
    for ent in doc.ents:
        if ent.label_ == "SKILL" or ent.label_ == "SOFT-SKILL":
            subset.append(ent.text)
    myset.append(subset)
    return subset


def unique_skills(x):
    return list(set(x))


@app.post("/match_candidates/")
def match_candidates(vacancy: Vacancy, candidates: List[Candidate]) -> Dict:
    vacancy_skills = unique_skills(get_skills(vacancy.description) + vacancy.skills)
    matched_candidates = get_matched_candidates(vacancy_skills, candidates)

    result = {
        "matched_candidates": [
            {"id": c[0].id, "match_percentage": c[1]} for c in matched_candidates
        ]
    }

    return result
