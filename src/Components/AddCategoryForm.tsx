import React, { useState } from 'react';

import { TodoFormContainer, GreenButton, Input } from './StyledComponents';
import { useCategoryActions } from '../Providers/TodoProvider';

export const AddCategoryForm = () => {
	const { addCategory } = useCategoryActions();

	const [title, setTitle] = useState('');

	return (
		<form>
			<TodoFormContainer>
				<Input
					type='title'
					placeholder='Add Todo'
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>

				<GreenButton
					type='submit'
					onClick={(e) => {
						e.preventDefault();
						addCategory(title);
						setTitle('');
					}}>
					+
				</GreenButton>
			</TodoFormContainer>
		</form>
	);
};
