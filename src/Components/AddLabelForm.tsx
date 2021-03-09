import { Formik, Form } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { useLabelActions } from '../Hooks';
import { useModal } from '../Providers/ModalProvider';
import SwitchInput from './Switch';

const Input = styled.input`
	width: 95%;
	height: 30px;
	font-size: 15px;
	outline: none;
	border-radius: 5px;
	border: 1px solid black;
	padding: 5px;
`;
const Error = styled.div`
	color: tomato;
`;

const ButtonContainer = styled.div`
	padding-top: 15px;
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
	background: #f5f5f5;
	outline: none;
	padding: 8px;
	border-radius: 5px;
	font-weight: 550;
	margin-left: 5px;
	border: 1px solid #eeeeee;
	cursor: pointer;
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
						<h3 style={{ marginLeft: 5, margin: 3, padding: 3 }}>Add Label</h3>
						<div>
							<Input
								name='title'
								placeholder='Add label'
								onChange={handleChange}
							/>
							{errors.title && touched.title ? (
								<Error>{errors.title}</Error>
							) : null}
							<div style={{ paddingTop: 15, display: 'flex' }}>
								<SwitchInput />
								<span style={{ paddingLeft: 10 }}>Add to favorites</span>
							</div>
							<ButtonContainer>
								<SaveButton type='submit'>SAVE</SaveButton>
								<CancelButton onClick={closeModalDialog}>CANCEL</CancelButton>
							</ButtonContainer>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
