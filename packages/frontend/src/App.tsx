import { styled } from '@mui/system';
import { AppRouterProvider } from './app/appRouter/appRouterProvider.tsx';
import { AppHeader } from './app/appHeader';

const Container = styled('div')`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled('div')`
  width: 100%;
  flex-grow: 1;
  background-color: ${({ theme: { palette } }) => palette.colorBgContainer};
`;

export const App = () => {
	return (
		<Container>
			<Content>
				<AppHeader/>
				<AppRouterProvider/>
			</Content>
		</Container>
	);
};