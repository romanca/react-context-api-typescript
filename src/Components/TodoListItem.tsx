import React, { useState } from 'react';
import Icon from '../Icon/Icon';

import { useTodoActions } from '../Hooks';
import { GreenButton, RedButton } from './StyledComponents';
import { formatDateToTodoDate } from '../shared/date-formatter';

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
	const [todoTitle, setTodoTitle] = useState('');
	const [todoDescription, setTodoDescription] = useState('');
	const [todoPriority, setTodoPriority] = useState('');

	const toggleTodo = () => {
		setOpen((current) => {
			if (!current) {
				setTodoTitle(todo.text);
				setTodoDescription(todo.description);
				setTodoPriority(todo.priority);
			} else {
				setTodoTitle('');
				setTodoDescription('');
				setTodoPriority('');
			}
			return !current;
		});
	};
	const handleChange = (e: any) => {
		setTodoTitle(e.target.value);
	};
	const handleTitleChange = (e: any) => {
		setTodoDescription(e.target.value);
	};
	const handlePriorityChange = (e: any) => {
		setTodoPriority(e.target.value);
	};
	const handleEditDone = () => {
		editTodo({
			...todo,
			text: todoTitle,
			description: todoDescription,
			priority: todoPriority,
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
								flexDirection: 'row',
								background: 'red',
								padding: 10,
								msFlexDirection: 'row',
							}}>
							<label>
								<b>title</b>
							</label>
							<div>{todo.text}</div>
							<label>
								<b>description</b>
							</label>
							<div>{todo.description}</div>
							<label>
								<b>priority</b>
							</label>
							<div>{todo.priority}</div>
							<label>
								<b>time</b>
							</label>
							<div>{formatDateToTodoDate(todo.date)}</div>
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
							<Input type='text' value={todoTitle} onChange={handleChange} />
							<Input
								type='text'
								value={todoDescription}
								onChange={handleTitleChange}
							/>
							<select value={todoPriority} onChange={handlePriorityChange}>
								<option>Low</option>
								<option>Medium</option>
								<option>High</option>
							</select>
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
