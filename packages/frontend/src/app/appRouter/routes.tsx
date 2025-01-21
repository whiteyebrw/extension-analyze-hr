import { RouteObject } from 'react-router';
import { HomePage } from '../../pages/Home';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <HomePage/>
	}
];