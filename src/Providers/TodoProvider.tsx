import React, { useState } from 'react';
import Context from './Context';

export interface IContext {
	todos: Todo[];
	categories: Category[];
	addTodo: (text: string) => void;
	addCategory: (title: string) => void;
	removeTodo: (id: number) => void;
	editTodo: (todo: Todo) => void;
	completeTodo: (selectedTodo: Todo) => void;
	getTodoById: (id: Todo) => void;
	selected?: Category;
	handleSelected: (category: Category) => void;
}

const initialTodos: Todo[] = [];
const initialCategories: Category[] = [];

const TodoProvider: React.FC = ({ children }) => {
	const [todos, setTodos] = useState(initialTodos);
	const [categories, setCategories] = useState(initialCategories);
	const [selected, setSelected] = useState<Category>();

	const handleSelected = (category: Category) => {
		setSelected(category);
	};

	const addCategory = (title: string) => {
		const newCategory = {
			title,
			id: Date.now(),
		};
		setCategories((current) => [...current, newCategory]);
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
			console.log(newTodo);
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
		const newTodos = todos.map((todo) => {
			if (todo === selectedTodo) {
				return {
					...todo,
					complete: !todo.complete,
				};
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const getTodoById = (id: Todo) => {
		return todos.find((i) => i.id === id);
	};

	return (
		<Context.Provider
			value={{
				todos,
				categories,
				selected,
				handleSelected,
				addTodo,
				addCategory,
				removeTodo,
				editTodo,
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
export const useCategoryActions = () => {
	const { addCategory, selected, handleSelected } = React.useContext(
		Context,
	) as IContext;

	return { addCategory, selected, handleSelected };
};
export const useCategories = () => {
	const { categories } = React.useContext(Context) as IContext;
	return { categories };
};

export const useTodos = () => {
	const { todos, selected } = React.useContext(Context) as IContext;
	return {
		todos: todos.filter((i) => selected && i.categoryId === selected.id),
	};
};

export default TodoProvider;
