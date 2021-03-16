import React from 'react';
import { useLabelState } from '../Hooks';
import styled from 'styled-components';
import { AddTodoForm } from './AddTodoForm';
import Icon from '../Icon/Icon';

const LabelTitle = styled.div`
	font-weight: 500;
	font-size: 20px;
`;

const AddTodoFormButton = styled.button`
	border: none;
	outline: none;
	background: transparent;
	color: tomato;
	font-size: 15px;
	cursor: pointer;
	display: flex;
`;

export const TodoList = ({
	switchContent,
	valueSelect,
	onChange,
	value,
}: any) => {
	const { selectedLabel } = useLabelState();
	const [open, setOpen] = React.useState(false);

	const handleOpenAddTodoForm = () => {
		setOpen(true);
	};

	const handleCloseAddTodoForm = () => {
		setOpen(false);
	};

	return (
		<div>
			<div
				style={{
					margin: 'auto',
					width: '75%',
					padding: 10,
				}}>
				<LabelTitle>{selectedLabel && selectedLabel.title}</LabelTitle>
				<div>{switchContent(valueSelect)}</div>
				{!open ? (
					<AddTodoFormButton onClick={handleOpenAddTodoForm}>
						<Icon name='plus' />
						<span style={{ paddingLeft: 5 }}>Add Task</span>
					</AddTodoFormButton>
				) : (
					<AddTodoForm handleCloseAddTodoForm={handleCloseAddTodoForm} />
				)}
			</div>
		</div>
	);
};
