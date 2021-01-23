import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoActions } from './TodoProvider';

const Input = styled.input`
	border: 1px solid black;
	height: 30px;
	outline: none;
	border-radius: 5px;
	width: 80%;
`;

const Button = styled.button`
	height: 30px;
	width: 30px;
	color: white;
	background: green;
	border: none;
	outline: none;
	cursor: pointer;
	border-radius: 50%;
	font-size: 15px;
	margin-left: 5px;
`;

const TodoFormContainer = styled.div`
	flex-direction: row;
	width: 350px;
	padding: 5px;
`;

export const AddTodoForm = () => {
	const { addTodo } = useTodoActions();

	const [text, setText] = useState('');

	return (
		<form>
			<TodoFormContainer>
				<Input
					type='text'
					placeholder='Add Todo'
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>

				<Button
					type='submit'
					onClick={(e) => {
						e.preventDefault();
						addTodo(text);
						setText('');
					}}>
					+
				</Button>
			</TodoFormContainer>
		</form>
	);
};
