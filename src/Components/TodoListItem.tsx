import React, { useState } from 'react';
import Icon from '../Icon/Icon';

import { useTodoActions } from '../Providers/TodoProvider';
import { GreenButton, RedButton } from './StyledComponents';
import {
	Container,
	TodoListContainer,
	CheckBox,
	Input,
} from './StyledComponents';

interface IProps {
	todo: Todo;
}

export const TodoListItem: React.FC<IProps> = ({ todo }) => {
	const { removeTodo, editTodo, completeTodo } = useTodoActions();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	const toggleTodo = () => {
		setOpen((current) => {
			if (!current) {
				setValue(todo.text);
			} else {
				setValue('');
			}
			return !current;
		});
	};
	const handleChange = (e: any) => {
		setValue(e.target.value);
	};

	const handleEditDone = () => {
		editTodo({
			...todo,
			text: value,
		});

		toggleTodo();
	};

	return (
		<Container>
			{!open ? (
				<div style={{ display: 'flex' }}>
					<TodoListContainer>
						<CheckBox
							type='checkbox'
							defaultChecked={todo.complete}
							onClick={() => {
								completeTodo(todo);
							}}
						/>
						<div
							style={{
								textDecoration: todo.complete ? 'line-through' : undefined,
								marginBottom: 'auto',
								marginTop: 'auto',
								paddingLeft: 5,
							}}>
							{todo.text}
						</div>
					</TodoListContainer>
					<RedButton
						onClick={() => {
							removeTodo(todo.id);
						}}>
						<Icon name='remove' />
					</RedButton>
					<GreenButton onClick={toggleTodo}>
						<Icon name='edit' />
					</GreenButton>
				</div>
			) : (
				<div style={{ display: 'flex' }}>
					<TodoListContainer>
						<CheckBox
							type='checkbox'
							defaultChecked={todo.complete}
							onClick={() => {
								completeTodo(todo);
							}}
						/>
						<div
							style={{
								textDecoration: todo.complete ? 'line-through' : undefined,
								marginBottom: 'auto',
								marginTop: 'auto',
								paddingLeft: 5,
								width: '90%',
							}}>
							<Input type='text' value={value} onChange={handleChange} />
						</div>
					</TodoListContainer>
					<RedButton onClick={toggleTodo}>x</RedButton>
					<GreenButton onClick={handleEditDone}>
						<Icon name='edit' />
					</GreenButton>
				</div>
			)}
		</Container>
	);
};
