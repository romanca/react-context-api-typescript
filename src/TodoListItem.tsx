import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoActions } from './TodoProvider';

const Container = styled.div`
	padding: 15px;
	margin-bottom: 15px;
	border-radius: 5px;
	list-style: none;
	border: 1px solid black;
`;
const TodoListContainer = styled.div`
	display: flex;
	width: 100%;
`;
const CheckBox = styled.input`
	margin-top: auto;
	margin-bottom: auto;
`;

const Input = styled.input`
	height: 30px;
	outline: none;
	width: 600px;
	border: none;
	outline: none;
	background: transparent;
	border-bottom: 1px solid black;
`;
const SubmitEditButton = styled.button`
	border-radius: 50%;
	width: 50px;
	height: 50px;
	outline: none;
	border: none;
	background-color: green;
	margin-left: 5px;
`;

const DeleteCancelButton = styled.button`
	border-radius: 50%;
	width: 50px;
	height: 50px;
	outline: none;
	border: none;
	background-color: tomato;
`;
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
					<DeleteCancelButton
						onClick={() => {
							removeTodo(todo.id);
						}}>
						X
					</DeleteCancelButton>
					<SubmitEditButton onClick={toggleTodo}>EDIT</SubmitEditButton>
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
							}}>
							<Input type='text' value={value} onChange={handleChange} />
						</div>
					</TodoListContainer>
					<SubmitEditButton onClick={handleEditDone}>+</SubmitEditButton>
					<DeleteCancelButton onClick={toggleTodo}>X</DeleteCancelButton>
				</div>
			)}
		</Container>
	);
};
