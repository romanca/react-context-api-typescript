import React from 'react';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
import TodoProvider from './TodoProvider';
import Theme from './ThemeProvider';

const App = () => {
	return (
		<TodoProvider>
			<Theme>
				<div>
					<AddTodoForm />
					<TodoList />
				</div>
			</Theme>
		</TodoProvider>
	);
};

export default App;
