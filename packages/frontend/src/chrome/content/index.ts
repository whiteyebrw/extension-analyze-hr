export {}
	;
(() => {
	const frame = document.getElementById('ain-frame');

	if (frame) {
		frame.remove();
		return;
	}
	const iframe = document.createElement('iframe');
	iframe.setAttribute('id', 'ain-frame');
	iframe.setAttribute('title', 'ain-frame');
	iframe.setAttribute(
		'style',
		'right: 0;width: 500px;height: 100%;z-index: 2147483650;border: none; position:fixed;top: 0; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px -1px rgba(0,0,0,0.1);'
	);
	iframe.setAttribute('allow', '');
	iframe.src = chrome.runtime.getURL('index.html');
	// eslint-disable-next-line func-names
	iframe.onload = function () {
		setTimeout(() => {
			chrome.runtime.sendMessage({ frameType: 'main', frameId: 'ain-frame' });
		}, 100);
	};
	document.documentElement.appendChild(iframe);
})();
