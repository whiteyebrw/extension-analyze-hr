import { RouterProvider } from 'react-router';
import { router } from './router.ts';

export const AppRouterProvider = () => {
	return <RouterProvider router={router} />
}