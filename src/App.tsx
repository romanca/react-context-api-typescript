import React from 'react';
import { TodoList } from './Components/TodoList';
import { AddTodoForm } from './Components/AddTodoForm';
import TodoProvider from './Providers/TodoProvider';
import Theme from './Providers/ThemeProvider';

const App = () => {
	return (
		<TodoProvider>
			<Theme>
				<div
					style={{
						border: '1px solid black',
						width: 800,
						height: 700,
						padding: 10,
					}}>
					<AddTodoForm />
					<TodoList />
				</div>
			</Theme>
		</TodoProvider>
	);
};

export default App;
