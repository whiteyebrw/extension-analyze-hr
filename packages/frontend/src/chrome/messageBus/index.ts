import { parseVacancyHh } from '../parseVacancyHh';
import { parseResumeHh } from '../parseResumeHh';

(() => {
	if (document.body.getAttribute('messageBus')) {
		return;
	}

	document.body.setAttribute('messageBus', 'messageBus');

	chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
		switch (request.action) {
			case 'parseVacancyHh': {
				const parsedInfo = parseVacancyHh();
				sendResponse({ parsedInfo });
				break;
			}
			case 'parseResumeHh': {
				const parsedInfo = parseResumeHh();
				sendResponse({ parsedInfo });
				break;
			}
			case 'fullBodyParse': {
				sendResponse(
					(
						document.evaluate(
							'/html/body',
							document,
							null,
							XPathResult.FIRST_ORDERED_NODE_TYPE,
							null
						)?.singleNodeValue as HTMLElement
					)?.innerText
				);
				break;
			}
		}
		return true;
	});
})();
