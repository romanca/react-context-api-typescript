import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import { useTodoActions } from '../Providers/TodoProvider';
import { TodoFormContainer, Input } from './StyledComponents';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Error } from './AddLabelForm';
import DatePicker from 'react-datepicker';

export const AddTodoForm = () => {
	const { addTodo } = useTodoActions();

	const validationSchema = yup.object({
		text: yup.string().required('This field cannot be empty...!!!'),
	});

	return (
		<Formik
			initialValues={{
				text: '',
				description: '',
				priority: '',
				date: new Date(),
			}}
			validationSchema={validationSchema}
			validateOnChange={true}
			onSubmit={(i) => {
				addTodo(i);
			}}>
			{({ errors, touched, handleChange, setFieldValue, values }) => (
				<Form>
					<TodoFormContainer>
						<Input
							type='text'
							name='text'
							placeholder='Add label'
							onChange={handleChange}
						/>
						{errors.text && touched.text ? <Error>{errors.text}</Error> : null}
						<Input
							type='text'
							name='description'
							placeholder='Add Description'
							onChange={handleChange}
						/>
						<select name='priority' onChange={handleChange}>
							<option>Low</option>
							<option>Medium</option>
							<option>High</option>
						</select>
						<DatePicker
							name='date'
							selected={values.date}
							onChange={(date) => setFieldValue('date', date)}
						/>
					</TodoFormContainer>
					<div style={{ width: 50, marginLeft: '92%' }}>
						<button
							style={{
								width: 50,
								height: 25,
								background: 'green',
								marginTop: 15,
							}}
							type='submit'>
							<Icon name='plus' color='green' />
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
