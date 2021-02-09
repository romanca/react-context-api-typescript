import React from 'react';
import { TodoFormContainer, GreenButton, Input } from './StyledComponents';
import { useLabelActions } from '../Providers/TodoProvider';

import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

const Error = styled.div`
	color: red;
	font-size: 15;
`;

const validationSchema = yup.object({
	title: yup
		.string()
		.min(2, 'Too Short!')
		.max(20, 'Too Long!')
		.required('Required'),
});

export const AddLabelForm = () => {
	const { addLabel } = useLabelActions();

	return (
		<TodoFormContainer>
			<Formik
				initialValues={{ title: '' }}
				validationSchema={validationSchema}
				validateOnChange={true}
				onSubmit={(i) => {
					addLabel(i.title);
				}}>
				{({ errors, touched, handleChange }) => (
					<Form>
						<Input
							name='title'
							placeholder='Add label'
							onChange={handleChange}
						/>
						{errors.title && touched.title ? (
							<div style={{ color: 'red' }}>{errors.title}</div>
						) : null}
						<GreenButton type='submit'>+</GreenButton>
					</Form>
				)}
			</Formik>
		</TodoFormContainer>
		// <form>
		// 	<TodoFormContainer>
		// 		<Input
		// 			type='title'
		// 			placeholder='Add label'
		// 			value={title}
		// 			onChange={(e) => {
		// 				setTitle(e.target.value);
		// 			}}
		// 		/>

		// 		<GreenButton
		// 			type='submit'
		// 			onClick={(e) => {
		// 				e.preventDefault();
		// 				addLabel(title);
		// 				setTitle('');
		// 			}}>
		// 			+
		// 		</GreenButton>
		// 	</TodoFormContainer>
		// </form>
	);
};
