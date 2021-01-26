import React from 'react';
import { TodoList } from './Components/TodoList';
import { AddTodoForm } from './Components/AddTodoForm';
import TodoProvider from './Providers/TodoProvider';
import Theme from './Providers/ThemeProvider';
import { AddCategoryForm } from './Components/AddCategoryForm';
import { CategoryList } from './Components/CategoryList';

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
						display: 'flex',
					}}>
					{/* <AddTodoForm />
					<TodoList /> */}
					<div>
						<AddCategoryForm />
						<CategoryList />
					</div>
					<div>
						<TodoList />
					</div>
				</div>
			</Theme>
		</TodoProvider>
	);
};

export default App;
