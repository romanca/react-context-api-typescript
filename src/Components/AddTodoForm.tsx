import React from 'react';
import { useTodoActions, useLabelState } from '../Hooks';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import DatePicker from '../Wrappers/DatePicker';
import styled from 'styled-components';

const AddTodoInput = styled.input`
	height: 30px;
	font-size: 15px;
	outline: none;
	border-radius: 5px;
	border: 1px solid black;
	padding: 5px;
	width: 100%;
`;
const Error = styled.div`
	color: red;
`;
const SelectTodoItem = styled.select`
	height: 30px;
	outline: none;
	border: 1px solid black;
	border-radius: 5px;
	margin-top: 10px;
`;
const SaveButton = styled.button`
	background: tomato;
	border: 1px solid tomato;
	outline: none;
	padding: 8px;
	border-radius: 5px;
	color: white;
	font-weight: 550;
	cursor: pointer;
`;
const CancelButton = styled.button`
	background: transparent;
	outline: none;
	padding: 8px;
	border-radius: 5px;
	font-weight: 550;
	margin-left: 5px;
	border: 1px solid #eeeeee;
	cursor: pointer;
`;

interface IProps {
	handleCloseAddTodoForm: () => void;
}

export const AddTodoForm: React.FC<IProps> = ({ handleCloseAddTodoForm }) => {
	const { addTodo } = useTodoActions();
	const { selectedLabel } = useLabelState();

	const handleSubmit = React.useCallback(
		(todo: Omit<Todo, 'id'>) => {
			addTodo({ ...todo, categoryId: selectedLabel?.id });
			handleCloseAddTodoForm();
		},
		[selectedLabel],
	);

	const validationSchema = yup.object({
		text: yup.string().required('This field cannot stay empty...!!!'),
	});

	return (
		<Formik
			initialValues={{
				text: '',
				priority: 'Low',
				date: new Date(),
			}}
			validationSchema={validationSchema}
			validateOnChange={true}
			onSubmit={handleSubmit}>
			{({ errors, touched, handleChange, setFieldValue, values }) => (
				<div>
					<Form>
						<div style={{ width: '98%', marginTop: 10, marginLeft: 5 }}>
							<div>
								<div>
									<AddTodoInput
										type='text'
										name='text'
										placeholder='Add task'
										onChange={handleChange}
									/>
									{errors.text && touched.text ? (
										<Error>{errors.text}</Error>
									) : null}
									<SelectTodoItem name='priority' onChange={handleChange}>
										<option>Low</option>
										<option>Medium</option>
										<option>High</option>
									</SelectTodoItem>
									<DatePicker
										selected={values.date}
										onChange={(date: any) => setFieldValue('date', date)}
									/>
								</div>
								<div style={{ paddingTop: 15 }}>
									<SaveButton type='submit'>Save</SaveButton>
									<CancelButton onClick={handleCloseAddTodoForm}>
										Cancel
									</CancelButton>
								</div>
							</div>
						</div>
					</Form>
				</div>
			)}
		</Formik>
	);
};

// TODO make submit from button on onCLick
