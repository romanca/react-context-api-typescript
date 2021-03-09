import React from 'react';
import Icon from '../Icon/Icon';
import { useTodoActions, useLabelState } from '../Hooks';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useModal } from '../Providers/ModalProvider';
import styled from 'styled-components';

export const AddTodoForm = () => {
	const { addTodo } = useTodoActions();
	const { selectedLabel } = useLabelState();
	const { closeModalDialog } = useModal();

	const handleSubmit = React.useCallback(
		(todo: Omit<Todo, 'id'>) => {
			addTodo({ ...todo, categoryId: selectedLabel?.id });
			closeModalDialog();
		},
		[selectedLabel],
	);

	const validationSchema = yup.object({
		text: yup.string().required('This field cannot be empty...!!!'),
		description: yup.string().required('This field cannot be empty...!!!'),
	});
	return (
		<Formik
			initialValues={{
				text: '',
				description: '',
				priority: 'Low',
				date: new Date(),
			}}
			validationSchema={validationSchema}
			validateOnChange={true}
			onSubmit={handleSubmit}>
			{({ errors, touched, handleChange, setFieldValue, values }) => (
				<Form>
					<h3 style={{ marginLeft: 5, margin: 3, padding: 3 }}>Add task</h3>
					<div>
						<div>
							<input
								type='text'
								name='text'
								placeholder='Add task'
								onChange={handleChange}
								style={{
									width: '95%',
									height: 30,
									fontSize: 15,
									outline: 'none',
									borderRadius: 5,
									border: '1px solid black',
									padding: 5,
								}}
							/>
							{errors.text && touched.text ? (
								<div style={{ color: 'red' }}>{errors.text}</div>
							) : null}
							<input
								type='text'
								name='description'
								placeholder='Add Description'
								onChange={handleChange}
								style={{
									marginTop: 10,
									width: '95%',
									height: 30,
									fontSize: 15,
									outline: 'none',
									borderRadius: 5,
									border: '1px solid black',
									padding: 5,
								}}
							/>
							{errors.description && touched.description ? (
								<div>{errors.description}</div>
							) : null}
							<select
								name='priority'
								onChange={handleChange}
								style={{
									height: 30,
									outline: 'none',
									border: '1px solid black',
									marginTop: 15,
								}}>
								<option>Low</option>
								<option>Medium</option>
								<option>High</option>
							</select>
							<DatePicker
								name='date'
								selected={values.date}
								onChange={(date) => setFieldValue('date', date)}
							/>
						</div>
						<div style={{ paddingTop: 15 }}>
							<button
								style={{
									background: 'tomato',
									border: '1px solid tomato',
									outline: 'none',
									padding: 8,
									borderRadius: 5,
									color: 'white',
									fontWeight: 550,
									cursor: 'pointer',
								}}
								type='submit'>
								{/* <Icon name='plus' color='green' /> */}
								SUBMIT
							</button>
							<button
								style={{
									background: '#f5f5f5',
									outline: 'none',
									padding: 8,
									borderRadius: 5,
									fontWeight: 550,
									marginLeft: 5,
									border: '1px solid #eeeeee',
									cursor: 'pointer',
								}}
								onClick={closeModalDialog}>
								CANCEL
							</button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};
