import React from 'react';
import useFilteredTodos from './useFilteredTodos';

const useLayout = () => {
	const [valueSelect, setValueSelect] = React.useState('all');
	const {
		renderCompletedTodos,
		renderAllTodos,
		renderActiveTodos,
		renderPriorityLowTodos,
		renderPriorityMediumTodos,
		renderPriorityHighTodos,
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
			case 'priorityLow':
				return <div>{renderPriorityLowTodos()}</div>;
			case 'priorityMiddle':
				return <div>{renderPriorityMediumTodos()}</div>;
			case 'priorityHigh':
				return <div>{renderPriorityHighTodos()}</div>;
			default:
				return null;
		}
	};
	return {
		valueSelect,
		setValueSelect,
		toggleContent,
		switchContent,
	};
};
export default useLayout;
