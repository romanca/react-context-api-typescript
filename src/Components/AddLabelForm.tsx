import React from 'react';
import {
	TodoFormContainer,
	GreenButton,
	Input,
	Error,
} from './StyledComponents';
import { useLabelActions } from '../Providers/TodoProvider';

import { Formik, Form } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
	title: yup
		.string()
		.min(2, 'Title is too Short...!!!')
		.max(20, 'Title is tooLong...!!!')
		.required('Title is Required...!!!'),
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
						<Input placeholder='Add label' onChange={handleChange} />
						{errors.title && touched.title ? (
							<Error>{errors.title}</Error>
						) : null}
						<GreenButton type='submit'>+</GreenButton>
					</Form>
				)}
			</Formik>
		</TodoFormContainer>
	);
};
