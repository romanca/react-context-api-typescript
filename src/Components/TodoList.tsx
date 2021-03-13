import React from 'react';
import { useLabelState } from '../Hooks';
import useFilteredTodos from '../Hooks/useFilteredTodos';
import styled from 'styled-components';
import { AddTodoForm } from './AddTodoForm';
import Icon from '../Icon/Icon';

const Header = styled.header`
	padding: 2px;
	text-align: center;
	background: #fafafa;
	color: white;
	height: 5vh;
`;

const LabelTitle = styled.div`
	font-weight: 500;
	font-size: 20px;
`;
const Bottom = styled.header`
	background: #f1f1f1;
	height: 5vh;
	position: absolute;
	bottom: 0px;
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

export const TodoList = () => {
	const { selectedLabel } = useLabelState();
	const [open, setOpen] = React.useState(false);

	const [valueSelect, setValueSelect] = React.useState('all');
	const {
		renderCompletedTodos,
		renderAllTodos,
		renderActiveTodos,
		handleChange,
		searchTerm,
	} = useFilteredTodos();

	const handleOpenAddTodoForm = () => {
		setOpen(true);
	};

	const handleCloseAddTodoForm = () => {
		setOpen(false);
	};

	const toggleContent = (e: any) => {
		setValueSelect(e.target.value);
	};
	const switchContent = (value: any) => {
		switch (value) {
			case 'completed':
				return <div>{renderCompletedTodos()}</div>;
			case 'all':
				return <div>{renderAllTodos()}</div>;
			case 'active':
				return <div>{renderActiveTodos()}</div>;
			default:
				return null;
		}
	};

	return (
		<div>
			<Header>
				<input
					type='text'
					value={searchTerm}
					onChange={handleChange}
					placeholder='Search'
				/>
			</Header>
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
			<Bottom>
				<div>
					<button value='completed' onClick={toggleContent}>
						Completed
					</button>
					<button value='all' onClick={toggleContent}>
						All
					</button>
					<button value='active' onClick={toggleContent}>
						Active
					</button>
				</div>
			</Bottom>
		</div>
	);
};
