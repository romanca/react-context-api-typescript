import TodoProvider from './Providers/TodoProvider';
import Theme from './Providers/ThemeProvider';
import ModalProvider from './Providers/ModalProvider';
import Layout from './Components/Layout';

const App = () => {
	return (
		<TodoProvider>
			<ModalProvider>
				<Theme>
					<Layout />
				</Theme>
			</ModalProvider>
		</TodoProvider>
	);
};

export default App;
