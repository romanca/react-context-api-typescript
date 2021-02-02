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
	addTodo: (text: string, description: string, priority: string) => void;
	addLabel: (title: string) => void;
	removeLabel: (id: number) => void;
	removeTodo: (id: number) => void;
	editTodo: (todo: Todo) => void;
	editLabel: (label: Label) => void;
	completeTodo: (selectedTodo: Todo) => void;
	getTodoById: (id: Todo) => void;
	selected?: Label;
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
	const editLabel = async (label: Label) => {
		await editLabelApi(label);
		bootstrap();
	};

	const addTodo = async (
		text: string,
		description: string,
		priority: string,
	) => {
		if (selected) {
			const newTodo = {
				text,
				description,
				complete: false,
				id: Date.now(),
				categoryId: selected.id,
				priority,
			};
			console.log(newTodo);
			await createTodoApi(newTodo);
			bootstrap();
		}
	};
	const completeTodo = async (selectedTodo: Todo) => {
		await completeTodoApi(selectedTodo);
		bootstrap();
	};

	const removeTodo = async (id: number) => {
		await removeTodoApi(id);
		bootstrap();
	};

	const editTodo = async (todo: Todo) => {
		await editTodoApi(todo);
		bootstrap();
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
