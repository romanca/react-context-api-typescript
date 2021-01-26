import React from 'react';
import { TodoListItem } from './TodoListItem';
import { useTodos, useCategoryActions } from '../Providers/TodoProvider';
import { AddTodoForm } from './AddTodoForm';

export const TodoList = () => {
	const { todos } = useTodos();
	const { selected } = useCategoryActions();

	return (
		<div>
			{selected && selected.title}
			{todos.map((todo) => (
				<TodoListItem todo={todo} key={todo.id} />
			))}
			{selected && <AddTodoForm />}
		</div>
	);
};
