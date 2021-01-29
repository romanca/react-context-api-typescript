import React from 'react';
import { TodoListItem } from './TodoListItem';
import { useTodos, useLabelActions } from '../Providers/TodoProvider';

export const TodoList = () => {
	const { todos } = useTodos();
	const { selected } = useLabelActions();

	return (
		<div>
			<div
				style={{
					fontWeight: 500,
					fontSize: 20,
					textAlign: 'center',
				}}>
				{selected && selected.title}
			</div>
			{todos.map((todo) => (
				<TodoListItem todo={todo} key={todo.id} />
			))}
		</div>
	);
};
