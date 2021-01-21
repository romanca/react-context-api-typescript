import React from 'react';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
import TodoProvider from './TodoProvider';

function App() {
	return (
		<TodoProvider>
			<div>
				<main style={{ display: 'flex' }}>
					<section>
						<AddTodoForm />
					</section>
					<section style={{ marginLeft: 20 }}>
						<header style={{ marginLeft: 10 }}>
							<h1>Taskslist</h1>
						</header>

						<TodoList />
					</section>
				</main>
			</div>
		</TodoProvider>
	);
}

export default App;
