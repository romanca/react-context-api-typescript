import React from 'react';
import { TodoListItem } from '../Components/TodoListItem';
import { useTodosBySelectedLabel } from './selectors';

const useFilteredTodos = () => {
	const todos = useTodosBySelectedLabel();
	const [searchTerm, setSearchTerm] = React.useState('');

	const handleChange = (e: any) => {
		setSearchTerm(e.target.value);
	};
	const search = () => {
		return todos.filter((todo: Todo) => todo.text.indexOf(searchTerm) > -1);
	};
	// const results = !searchTerm;
	// todos.filter((i) => i.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

	const renderCompletedTodos = () => {
		return search()
			.filter((todo: Todo) => todo.complete)
			.map((todo: Todo) => <TodoListItem todo={todo} key={todo.id} />);
	};

	const renderAllTodos = () => {
		return search().map((todo: Todo) => (
			<TodoListItem todo={todo} key={todo.id} />
		));
	};
	const renderActiveTodos = () => {
		return search()
			.filter((todo: Todo) => !todo.complete)
			.map((todo: Todo) => <TodoListItem todo={todo} key={todo.id} />);
	};

	return {
		renderCompletedTodos,
		renderAllTodos,
		renderActiveTodos,
		search,
		handleChange,
		searchTerm,
	};
};

export default useFilteredTodos;
