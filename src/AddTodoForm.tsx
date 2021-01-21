import React, { useState } from 'react';
import { useTodoActions } from './TodoProvider';

export const AddTodoForm = () => {
	const { addTodo } = useTodoActions();

	const [text, setText] = useState('');

	return (
		<form>
			<div>
				<input
					type='text'
					placeholder='Add Todo'
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>

				<button
					type='submit'
					onClick={(e) => {
						e.preventDefault();
						addTodo(text);
						console.log(text);
						setText('');
					}}>
					Add Todo
				</button>
			</div>
		</form>
	);
};
