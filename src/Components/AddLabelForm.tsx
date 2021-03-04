import React from 'react';
import { TodoFormContainer, GreenButton, Input } from './StyledComponents';

import { Formik, Form } from 'formik';
import * as yup from 'yup';
// import styled from 'styled-components';
import { useLabelActions } from '../Hooks';
import { useModal } from '../Providers/ModalProvider';

// const Error = styled.div`
// 	color: red;
// 	font-size: 15;
// `;

const validationSchema = yup.object({
	title: yup
		.string()
		.min(2, 'Too Short!')
		.max(20, 'Too Long!')
		.required('Required'),
});

export const AddLabelForm = () => {
	const { addLabel } = useLabelActions();
	const { closeModalDialog } = useModal();

	return (
		<TodoFormContainer>
			<Formik
				initialValues={{ title: '' }}
				validationSchema={validationSchema}
				validateOnChange={true}
				onSubmit={(i) => {
					addLabel({ title: i.title });
					closeModalDialog();
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
	);
};
