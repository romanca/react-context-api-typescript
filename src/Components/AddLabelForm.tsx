import React, { useState } from 'react';
import { TodoFormContainer, GreenButton, Input } from './StyledComponents';
import { useLabelActions } from '../Providers/TodoProvider';

export const AddLabelForm = () => {
	const { addLabel } = useLabelActions();
	const [title, setTitle] = useState('');

	return (
		<form>
			<TodoFormContainer>
				<Input
					type='title'
					placeholder='Add label'
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>

				<GreenButton
					type='submit'
					onClick={(e) => {
						e.preventDefault();
						addLabel(title);
						setTitle('');
					}}>
					+
				</GreenButton>
			</TodoFormContainer>
		</form>
	);
};
