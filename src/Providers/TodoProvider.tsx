import React, { useEffect } from 'react';
import Context from './Context';

import { useTodos as useTodosState } from '../Hooks/useTodos';
import { useLabels as useLabelsState } from '../Hooks/useLabels';

export interface IContext {
	todoState: ReturnType<typeof useTodosState>[0];
	todoActions: ReturnType<typeof useTodosState>[1];
	labelState: ReturnType<typeof useLabelsState>[0];
	labelActions: ReturnType<typeof useLabelsState>[1];
}

const TodoProvider: React.FC = ({ children }) => {
	const [todoState, todoActions] = useTodosState();
	const [labelState, labelActions] = useLabelsState();

	useEffect(() => {
		todoActions.fetchTodos();
		labelActions.fetchLabels();
	}, []);

	return (
		<Context.Provider
			value={{
				todoState,
				todoActions,
				labelState,
				labelActions,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useTodoContext = () => React.useContext(Context) as IContext;

export default TodoProvider;
