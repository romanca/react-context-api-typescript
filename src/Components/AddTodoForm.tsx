import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import { useTodoActions } from '../Providers/TodoProvider';
import { TodoFormContainer, GreenButton, Input } from './StyledComponents';

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

				<GreenButton
					type='submit'
					onClick={(e) => {
						e.preventDefault();
						addTodo(text);
						setText('');
					}}>
					<Icon name='plus' color='green' />
				</GreenButton>
			</TodoFormContainer>
		</form>
	);
};
