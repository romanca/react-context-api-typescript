import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import { useTodoActions } from '../Providers/TodoProvider';
import { TodoFormContainer, GreenButton, Input } from './StyledComponents';

export const AddTodoForm = () => {
	const { addTodo } = useTodoActions();
	const [text, setText] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('Low');

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
				<Input
					type='text'
					placeholder='Add Description'
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
				<select
					value={priority}
					onChange={(e) => {
						setPriority(e.target.value);
					}}>
					<option>Low</option>
					<option>Medium</option>
					<option>High</option>
				</select>

				<GreenButton
					type='submit'
					onClick={(e) => {
						e.preventDefault();
						addTodo(text, description, priority);
						setText('');
					}}>
					<Icon name='plus' color='green' />
				</GreenButton>
			</TodoFormContainer>
		</form>
	);
};
