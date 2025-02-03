import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { createOrUpdateVacancy } from '../api/http.ts';

const Header = styled('div')`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  padding: 10px;
`;

export const AppHeader: React.FC = () => {
	const onClickHH = async () => {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

		if (tab.id === undefined) {
			throw Error();
		}

		const { parsedInfo } = await chrome.tabs.sendMessage(tab.id, {
			action: 'parseVacancyHh',
		});

		try {
			const { data } = await createOrUpdateVacancy(parsedInfo);
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	const onClickResumeHH = async () => {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

		if (tab.id === undefined) {
			throw Error();
		}

		const { parsedInfo } = await chrome.tabs.sendMessage(tab.id, {
			action: 'parseResumeHh',
		});

		console.log(parsedInfo);
	};

	return (
		<Header>
			<Button onClick={onClickHH}>vacancy hh</Button>
			<Button onClick={onClickResumeHH}>resume hh</Button>
		</Header>
	);
};
