import React, { useState } from 'react';
import Context from './context';

export interface IContext {
	todos: Todo[];
	addTodo: (text: string) => void;
	removeTodo: (id: number) => void;
	handleTodoEdit: (todo: Todo) => void;
	completeTodo: (selectedTodo: Todo) => void;
	getTodoById: (id: Todo) => void;
}

const initialTodos: Todo[] = [];

const TodoProvider: React.FC = ({ children }) => {
	const [todos, setTodos] = useState(initialTodos);

	const addTodo = (text: string) => {
		const newTodo = { text, complete: false, id: Date.now() };
		setTodos((current) => [...current, newTodo]);
	};

	const removeTodo = (id: number) => {
		setTodos((current) => current.filter((todo) => todo.id !== id));
	};

	const handleTodoEdit = (todo: Todo) => {
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
				addTodo,
				removeTodo,
				handleTodoEdit,
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
		handleTodoEdit,
		completeTodo,
		getTodoById,
	} = React.useContext(Context) as IContext;

	return { addTodo, removeTodo, handleTodoEdit, completeTodo, getTodoById };
};
export const useTodos = () => {
	const { todos } = React.useContext(Context) as IContext;
	return { todos };
};

export default TodoProvider;
