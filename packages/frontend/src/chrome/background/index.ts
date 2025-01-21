chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id || 0 },
		files: ['./js/content.js', './js/messageBus.js'],
	});
});