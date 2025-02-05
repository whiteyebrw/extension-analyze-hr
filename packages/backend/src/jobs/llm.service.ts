import { Injectable } from '@nestjs/common';
import { LMStudioClient } from '@lmstudio/sdk';

@Injectable()
export class LlmService {
	private client: LMStudioClient;

	constructor() {
		this.client = new LMStudioClient();
	}

	async generateText(prompt: string){
		try {
			const model = await this.client.llm.get('deepseek-r1-distill-qwen-7b')
			const response = await model.complete(prompt);
			return response
		} catch (error) {
			throw new Error(`LM Studio Error: ${error.message}`);
		}
	}
}
