import React from 'react';
import { TodoListItem } from '../Components/TodoListItem';
import { useTodosBySelectedLabel } from './selectors';

const useFilteredTodos = () => {
	const todos = useTodosBySelectedLabel();

	const rednerCompletedTodos = () => {
		return todos
			.filter((i) => i.complete)
			.map((todo: Todo) => <TodoListItem todo={todo} key={todo.id} />);
	};

	const renderAllTodos = () => {
		return todos.map((todo: Todo) => (
			<TodoListItem todo={todo} key={todo.id} />
		));
	};
	const renderActiveTodos = () => {
		return todos
			.filter((i) => !i.complete)
			.map((todo: Todo) => <TodoListItem todo={todo} key={todo.id} />);
	};

	return {
		rednerCompletedTodos,
		renderAllTodos,
		renderActiveTodos,
	};
};

export default useFilteredTodos;
