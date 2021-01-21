// import React, { useState } from 'react';
// import Context from './Context';

// export interface IContext {
// 	todos: Todo[];
// 	addTodo: (text: string) => void;
// }

// const initialTodos: Todo[] = [];

// const TodoProvider: React.FC = ({ children }) => {
// 	const [todos, setTodos] = useState(initialTodos);

// 	const addTodo = (text: string) => {
// 		const newTodo = { text, complete: false, id: Date.now() };
// 		setTodos((current) => [...current, newTodo]);
// 	};

// 	return (
// 		<Context.Provider value={{ todos, addTodo }}>{children}</Context.Provider>
// 	);
// };

// export const useTodoActions = () => {
// 	const { addTodo } = React.useContext(Context) as IContext;
// 	return { addTodo };
// };
// export const useTodos = () => {
// 	const { todos } = React.useContext(Context) as IContext;
// 	return { todos };
// };

// export default TodoProvider;
import React from 'react';

export default function notes() {
	return <div></div>;
}
