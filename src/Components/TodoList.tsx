import React from 'react';
import { useLabelState } from '../Hooks';
import { ModalButton } from '../Modal/Modal';
import Icon from '../Icon/Icon';
import { useTodoConfirmDialog } from '../Providers/ModalProvider';
import useFilteredTodos from '../Hooks/useFilteredTodos';

export const TodoList = () => {
	const { selectedLabel } = useLabelState();
	const openModalDialog = useTodoConfirmDialog();
	const [valueSelect, setValueSelect] = React.useState('bcd');

	const {
		rednerCompletedTodos,
		renderAllTodos,
		renderActiveTodos,
	} = useFilteredTodos();

	const toggleContent = (e: any) => {
		setValueSelect(e.target.value);
	};
	const switchContent = (value: any) => {
		switch (value) {
			case 'completed':
				return <div>{rednerCompletedTodos()}</div>;
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
			<div
				style={{
					fontWeight: 500,
					fontSize: 20,
					textAlign: 'center',
				}}>
				{selectedLabel && selectedLabel.title}
			</div>
			<ModalButton onClick={openModalDialog}>
				<Icon name='plus' />
			</ModalButton>
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
