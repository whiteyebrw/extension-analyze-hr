export const normalizeHHUrl = (url: string): string => {
	const parsedUrl = new URL(url);
	parsedUrl.hostname = 'hh.ru';

	return parsedUrl.origin + parsedUrl.pathname;
}