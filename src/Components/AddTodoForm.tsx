import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import { useTodoActions } from '../Providers/TodoProvider';
import { TodoFormContainer, GreenButton, Input } from './StyledComponents';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const AddTodoForm = () => {
	const { addTodo } = useTodoActions();
	const [text, setText] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('Low');
	const [date, setDate] = useState(new Date());

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
				<DatePicker selected={date} onChange={(date: any) => setDate(date)} />
			</TodoFormContainer>
			<div style={{ width: 50, marginLeft: '92%' }}>
				<button
					style={{
						width: 50,
						height: 25,
						background: 'green',
						marginTop: 15,
					}}
					type='submit'
					onClick={(e) => {
						e.preventDefault();
						addTodo(text, description, priority, date);
						setText('');
					}}>
					<Icon name='plus' color='green' />
				</button>
			</div>
		</form>
	);
};
