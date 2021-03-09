import { Formik, Form } from 'formik';
import * as yup from 'yup';
// import styled from 'styled-components';
import { useLabelActions } from '../Hooks';
import { useModal } from '../Providers/ModalProvider';

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
		<div>
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
						<input
							name='title'
							placeholder='Add label'
							onChange={handleChange}
						/>
						{errors.title && touched.title ? (
							<div style={{ color: 'red' }}>{errors.title}</div>
						) : null}
						<button type='submit'>+</button>
						<button
							style={{
								width: 50,
								height: 25,
								background: 'red',
							}}
							onClick={closeModalDialog}>
							x
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
