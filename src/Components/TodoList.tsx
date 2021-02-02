import React from 'react';
import { TodoListItem } from './TodoListItem';
import { useTodos, useLabelActions } from '../Providers/TodoProvider';
import { ModalButton } from '../Modal/Modal';
import Icon from '../Icon/Icon';
import { useTodoConfirmDialog } from '../Providers/ModalProvider';

export const TodoList = () => {
	const { todos } = useTodos();
	const { selected } = useLabelActions();
	const openModalDialog = useTodoConfirmDialog();

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
			<ModalButton onClick={openModalDialog}>
				<Icon name='plus' />
			</ModalButton>
			{todos.map((todo) => (
				<TodoListItem todo={todo} key={todo.id} />
			))}
		</div>
	);
};
