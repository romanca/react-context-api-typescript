import React from 'react';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
import TodoProvider from './TodoProvider';
import Theme from './ThemeProvider';

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
