import React from 'react';
import Icon from '../Icon/Icon';
import { useTodoActions, useLabelState } from '../Hooks';
import { TodoFormContainer, Input } from './StyledComponents';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useModal } from '../Providers/ModalProvider';

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
					<TodoFormContainer>
						<Input
							type='text'
							name='text'
							placeholder='Add label'
							onChange={handleChange}
						/>
						{errors.text && touched.text ? (
							<div style={{ color: 'red' }}>{errors.text}</div>
						) : null}
						<Input
							type='text'
							name='description'
							placeholder='Add Description'
							onChange={handleChange}
						/>
						{errors.description && touched.description ? (
							<div>{errors.description}</div>
						) : null}
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
