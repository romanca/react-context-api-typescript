import React from 'react';
import { useLabelState } from '../Hooks';
import Icon from '../Icon/Icon';
import { useTodoConfirmDialog } from '../Providers/ModalProvider';
import useFilteredTodos from '../Hooks/useFilteredTodos';
import styled from 'styled-components';

const Header = styled.header`
	padding: 2px;
	text-align: center;
	background: #f1f1f1;
	color: white;
	height: 5vh;
`;
const LabelTitle = styled.div`
	font-weight: 500;
	font-size: 20px;
	text-align: center;
`;

export const TodoList = () => {
	const { selectedLabel } = useLabelState();
	const openModalDialog = useTodoConfirmDialog();
	const [valueSelect, setValueSelect] = React.useState('all');
	const {
		renderCompletedTodos,
		renderAllTodos,
		renderActiveTodos,
		handleChange,
		searchTerm,
	} = useFilteredTodos();

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
			<LabelTitle>{selectedLabel && selectedLabel.title}</LabelTitle>
			<button onClick={openModalDialog}>
				<Icon name='plus' />
			</button>
			<div>{switchContent(valueSelect)}</div>
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
		</div>
	);
};
