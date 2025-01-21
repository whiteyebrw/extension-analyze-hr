import { styled } from '@mui/system';
import { Button } from '@mui/material';

const Header = styled('div')`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  padding: 10px;
`;

export const AppHeader: React.FC = () => {
	const onClick = async () => {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

		if (tab.id === undefined) {
			throw Error();
		}

		const res = await chrome.tabs.sendMessage(tab.id, {
			action: 'fullBodyParse',
		});
		console.log(res);
	};

	const onClickHH = async () => {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

		if (tab.id === undefined) {
			throw Error();
		}

		const res = await chrome.tabs.sendMessage(tab.id, {
			action: 'parseVacancyHh',
		});
		console.log(res);
	};

	const onClickResumeHH = async () => {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

		if (tab.id === undefined) {
			throw Error();
		}

		const res = await chrome.tabs.sendMessage(tab.id, {
			action: 'parseResumeHh',
		});
		console.log(res);
	};

	return (
		<Header>
			<Button onClick={onClick}>full parse</Button>
			<Button onClick={onClickHH}>vacancy hh</Button>
			<Button onClick={onClickResumeHH}>resume hh</Button>
		</Header>
	);
};
