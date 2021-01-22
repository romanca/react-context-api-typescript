import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoActions } from './TodoProvider';

const Input = styled.input`
	border: 1px solid black;
	width: 100%;
	height: 30px;
	outline: none;
	border-radius: 10px;
`;

const Button = styled.button`
	height: 30px;
	width: 100%;
	color: white;
	background: green;
	border: none;
	outline: none;
	cursor: pointer;
	border-radius: 10px;
`;

const TodoFormContainer = styled.div`
	flex-direction: row;
	background: red;
	width: 30%;
	padding: 5px 5px 5px 5px;
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
						console.log(text);
						setText('');
					}}>
					X
				</Button>
			</TodoFormContainer>
		</form>
	);
};
