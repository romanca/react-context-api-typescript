import React, { useState } from 'react';
import Context from './Context';

import {
	getLabels,
	getTodos,
	createTodo as createTodoApi,
	createLabel as createLabelApi,
	removeLabel as removeLabelApi,
	editLabel as editLabelApi,
	removeTodo as removeTodoApi,
	editTodo as editTodoApi,
	completeTodo as completeTodoApi,
} from '../Api/index';

export interface IContext {
	todos: Todo[];
	labels: Label[];
	addTodo: (
		partialTodo: Pick<Todo, 'text' | 'description' | 'priority' | 'date'>,
	) => void;
	addLabel: (title: string) => void;
	removeLabel: (label: Label) => void;
	removeTodo: (todo: Todo) => void;
	editTodo: (todo: Todo) => void;
	editLabel: (label: Label) => void;
	completeTodo: (selectedTodo: Todo) => void;
	// getTodoById: (id: Todo) => void;
	selectedLabel?: Label;
	handleSelected: (label: Label) => void;
	selectedPriority?: any;
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
			const todos = await getTodos();
			setTodos(todos);
			setLabels(labels);
		} catch (error) {
			// TODO handle error
		}
	}, [setLabels, setTodos]);

	React.useEffect(() => {
		bootstrap();
	}, [bootstrap]);

	const selectedLabel = React.useMemo(
		() => labels.find((i) => i.id === selectedLabelId),
		[labels, selectedLabelId],
	);

	const handleSelected = (label: Label) => {
		setSelected(label.id);
	};

	const addLabel = async (title: string) => {
		const tempId = Date.now();
		const newLabel = {
			title,
		};
		const response = await createLabelApi(newLabel);

		setLabels((i) => [...i, { ...newLabel, id: tempId }]);
		try {
			setLabels((current) =>
				current.map((i) => (i.id === tempId ? response : i)),
			);
		} catch (e) {
			setLabels((current) => current.filter((i) => i.id !== tempId));
		}
	};
	const removeLabel = async (label: Label) => {
		setLabels((current) =>
			current.map((i) => (i.id === label.id ? { ...i, deleted: true } : i)),
		);
		try {
			await removeLabelApi(label.id);
			setLabels((current) => current.filter((i) => i.id !== label.id));
		} catch (e) {
			setLabels((current) =>
				current.map((i) => (i.id !== label.id ? { ...i, deleted: false } : i)),
			);
		}
	};
	const editLabel = async (label: Label) => {
		const response = await editLabelApi(label);
		try {
			setLabels((current) =>
				current.map((i) => (i.id === label.id ? response : i)),
			);
		} catch (e) {
			setLabels((current) => current.filter((i) => i.id !== label.id));
		}
	};

	const addTodo = async (
		partialTodo: Pick<Todo, 'text' | 'description' | 'priority' | 'date'>,
	) => {
		if (selectedLabel) {
			const tempId = Date.now();
			const newTodo = {
				...partialTodo,
				categoryId: selectedLabel.id,
			};
			setTodos((c) => [...c, { ...newTodo, id: tempId }]);
			try {
				const response = await createTodoApi(newTodo);
				setTodos((c) => c.map((i) => (i.id === tempId ? response : i)));
			} catch (e) {
				setTodos((c) => c.filter((i) => i.id !== tempId));
			}
		}
	};
	const completeTodo = async (selectedTodo: Todo) => {
		try {
			await completeTodoApi(selectedTodo);
			setTodos((current) =>
				current.map((todo: Todo) =>
					todo.id === selectedTodo.id
						? { ...todo, complete: !todo.complete }
						: todo,
				),
			);
		} catch (e) {
			setTodos((current) =>
				current.map((todo: Todo) =>
					todo.id !== selectedTodo.id
						? { ...todo, complete: todo.complete }
						: todo,
				),
			);
		}
	};

	const removeTodo = async (todo: Todo) => {
		setTodos((current) =>
			current.map((i) => (i.id === todo.id ? { ...i, deleted: true } : i)),
		);
		try {
			await removeTodoApi(todo.id);
			setTodos((current) => current.filter((i) => i.id !== todo.id));
		} catch (e) {}
	};

	const editTodo = async (todo: Todo) => {
		const response = await editTodoApi(todo);
		try {
			setTodos((current) =>
				current.map((i) => (i.id === todo.id ? response : i)),
			);
		} catch (e) {
			setTodos((current) =>
				current.filter((i) => (i.id !== todo.id ? response : i)),
			);
		}
	};

	// const getTodoById = (id: Todo) => {
	// 	return todos.find((i) => i.id === id);
	// };

	return (
		<Context.Provider
			value={{
				todos,
				labels,
				selectedLabel,
				handleSelected,
				addTodo,
				addLabel,
				removeTodo,
				removeLabel,
				editTodo,
				editLabel,
				completeTodo,
				// getTodoById,
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
		// getTodoById,
	} = React.useContext(Context) as IContext;

	return {
		addTodo,
		removeTodo,
		editTodo,
		completeTodo,
		// getTodoById,
	};
};
export const useLabelActions = () => {
	const {
		addLabel,
		removeLabel,
		editLabel,
		selectedLabel,
		handleSelected,
	} = React.useContext(Context) as IContext;
	return { addLabel, removeLabel, editLabel, selectedLabel, handleSelected };
};

export const useLabels = () => {
	const { labels } = React.useContext(Context) as IContext;
	return { labels };
};

export const useTodos = () => {
	const { todos, selectedLabel } = React.useContext(Context) as IContext;
	return {
		todos: todos.filter(
			(i) => selectedLabel && i.categoryId === selectedLabel.id,
		),
	};
};

export default TodoProvider;
