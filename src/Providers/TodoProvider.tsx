import React, { useState } from 'react';
import Context from './Context';
import {
	createLabel as createLabelApi,
	getLabels,
	removeLabel as removeLabelApi,
} from '../Api/index';

export interface IContext {
	todos: Todo[];
	labels: Label[];
	addTodo: (text: string) => void;
	addLabel: (title: string) => void;
	removeLabel: (id: number) => void;
	removeTodo: (id: number) => void;
	editTodo: (todo: Todo) => void;
	editLabel: (label: Label) => void;
	completeTodo: (selectedTodo: Todo) => void;
	getTodoById: (id: Todo) => void;
	selected?: Label;
	handleSelected: (label: Label) => void;
}

const initialTodos: Todo[] = [];
const initialLabels: Label[] = [];

const TodoProvider: React.FC = ({ children }) => {
	const [todos, setTodos] = useState(initialTodos);
	const [labels, setLabels] = useState(initialLabels);
	const [selectedLabelId, setSelected] = useState<number>();

	const bootstrap = React.useCallback(async () => {
		try {
			const labels = await getLabels();
			setLabels(labels);
		} catch (error) {
			// TODO handle error
		}
	}, [setLabels]);

	React.useEffect(() => {
		bootstrap();
	}, [bootstrap]);

	// const addTodo = async (text: string) => {
	// 	await createTodo({ text, complete: false });
	// 	bootstrap();
	// };

	const selected = React.useMemo(
		() => labels.find((i) => i.id === selectedLabelId),
		[labels, selectedLabelId],
	);

	const handleSelected = (label: Label) => {
		setSelected(label.id);
	};

	const addLabel = async (title: string) => {
		await createLabelApi({ title });
		bootstrap();
	};
	const removeLabel = async (id: number) => {
		await removeLabelApi(id);
		bootstrap();
	};
	const editLabel = (label: Label) => {
		// setLabels((current) =>
		// 	current.map((i) => {
		// 		if (i.id === label.id) {
		// 			return label;
		// 		}
		// 		return i;
		// 	}),
		// );
	};

	const addTodo = (text: string) => {
		if (selected) {
			const newTodo = {
				text,
				complete: false,
				id: Date.now(),
				categoryId: selected.id,
			};
			setTodos((current) => [...current, newTodo]);
		}
	};

	const removeTodo = (id: number) => {
		setTodos((current) => current.filter((todo) => todo.id !== id));
	};

	const editTodo = (todo: Todo) => {
		setTodos((current) =>
			current.map((i) => {
				if (i.id === todo.id) {
					return todo;
				}
				return i;
			}),
		);
	};

	const completeTodo = (selectedTodo: Todo) => {
		setTodos((current) =>
			current.map((todo) => {
				if (todo === selectedTodo) {
					return {
						...todo,
						complete: !todo.complete,
					};
				}
				return todo;
			}),
		);
	};

	const getTodoById = (id: Todo) => {
		return todos.find((i) => i.id === id);
	};

	return (
		<Context.Provider
			value={{
				todos,
				labels,
				selected,
				handleSelected,
				addTodo,
				addLabel,
				removeTodo,
				removeLabel,
				editTodo,
				editLabel,
				completeTodo,
				getTodoById,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useTodoActions = () => {
	const {
		addTodo,
		removeTodo,
		editTodo,
		completeTodo,
		getTodoById,
	} = React.useContext(Context) as IContext;

	return {
		addTodo,
		removeTodo,
		editTodo,
		completeTodo,
		getTodoById,
	};
};
export const useLabelActions = () => {
	const {
		addLabel,
		removeLabel,
		editLabel,
		selected,
		handleSelected,
	} = React.useContext(Context) as IContext;
	return { addLabel, removeLabel, editLabel, selected, handleSelected };
};

export const useLabels = () => {
	const { labels } = React.useContext(Context) as IContext;
	return { labels };
};

export const useTodos = () => {
	const { todos, selected } = React.useContext(Context) as IContext;
	return {
		todos: todos.filter((i) => selected && i.categoryId === selected.id),
	};
};

export default TodoProvider;
