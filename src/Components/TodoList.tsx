import React from 'react';
import { TodoListItem } from './TodoListItem';
import { useTodos } from '../Providers/TodoProvider';

export const TodoList = () => {
	const { todos } = useTodos();

	return (
		<div>
			{todos.map((todo) => (
				<TodoListItem todo={todo} key={todo.id} />
			))}
		</div>
	);
};
