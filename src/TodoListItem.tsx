import React, { useState } from 'react';
import { useTodoActions } from './TodoProvider';

interface IProps {
	todo: Todo;
}

export const TodoListItem: React.FC<IProps> = ({ todo }) => {
	const { removeTodo, editTodo, completeTodo } = useTodoActions();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	const toggleTodo = () => {
		setOpen((current) => {
			if (!current) {
				setValue(todo.text);
			} else {
				setValue('');
			}
			return !current;
		});
	};
	const handleChange = (e: any) => {
		setValue(e.target.value);
	};

	const handleEditDone = () => {
		editTodo({
			...todo,
			text: value,
		});

		toggleTodo();
	};

	return (
		<div style={{ padding: 5 }}>
			{!open ? (
				<div
					style={{
						display: 'flex',
						width: '100%',
						border: '1px solid black',
						padding: 5,
						borderRadius: 10,
					}}>
					<input
						style={{ marginTop: 'auto', marginBottom: 'auto' }}
						type='checkbox'
						defaultChecked={todo.complete}
						onClick={() => {
							completeTodo(todo);
						}}
					/>
					<div style={{ flexDirection: 'row', paddingLeft: 5 }}>
						<h5 style={{ fontWeight: 800, fontSize: 12 }}>Title</h5>
						<label
							style={{
								textDecoration: todo.complete ? 'line-through' : undefined,
							}}>
							<div
								style={{
									minWidth: 500,
									maxWidth: 500,
									overflow: 'scroll',
								}}>
								{todo.text}
							</div>
						</label>
					</div>
					<div style={{ backgroundColor: 'white' }}>
						<button
							style={{
								background: 'tomato',
								paddingTop: 5,
								paddingBottom: 5,
								color: 'white',
								borderRadius: 4,
								border: '#27ae60 1px solid',
								borderBottom: 'green 2px solid',
								marginTop: 10,
								float: 'left',
								marginLeft: 5,
								fontWeight: 800,
								fontSize: '0.8em',
								padding: 5,
							}}
							onClick={() => {
								removeTodo(todo.id);
							}}>
							REMOVE
						</button>
						<button
							style={{
								background: 'green',
								paddingTop: 5,
								paddingBottom: 5,
								color: 'white',
								borderRadius: 4,
								border: '#27ae60 1px solid',
								borderBottom: 'green 2px solid',
								marginTop: 10,
								float: 'left',
								marginLeft: 5,
								fontWeight: 800,
								fontSize: '0.8em',
								padding: 5,
							}}
							onClick={toggleTodo}>
							EDIT
						</button>
					</div>
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						width: '100%',
						border: '1px solid black',
						padding: 5,
						borderRadius: 10,
					}}>
					<input
						style={{ marginTop: 'auto', marginBottom: 'auto' }}
						type='checkbox'
						defaultChecked={todo.complete}
						onClick={() => {
							completeTodo(todo);
						}}
					/>
					<div style={{ flexDirection: 'row', paddingLeft: 5 }}>
						<h5 style={{ fontWeight: 800, fontSize: 12 }}>Title</h5>
						<label
							style={{
								textDecoration: todo.complete ? 'line-through' : undefined,
							}}>
							<div
								style={{
									minWidth: 500,
									maxWidth: 500,
									overflow: 'scroll',
								}}>
								<input
									type='text'
									value={value}
									onChange={handleChange}
									style={{
										borderBottom: '1px solid black',
										minWidth: 500,
										maxWidth: 500,
									}}
								/>
							</div>
						</label>
					</div>
					<div style={{ backgroundColor: 'white' }}>
						<button
							style={{
								background: 'green',
								paddingTop: 5,
								paddingBottom: 5,
								color: 'white',
								borderRadius: 4,
								border: '#27ae60 1px solid',
								borderBottom: 'green 2px solid',
								marginTop: 10,
								float: 'left',
								marginLeft: 5,
								fontWeight: 800,
								fontSize: '0.8em',
								padding: 5,
							}}
							onClick={handleEditDone}>
							SUBMIT
						</button>
						<button
							style={{
								background: 'tomato',
								paddingTop: 5,
								paddingBottom: 5,
								color: 'white',
								borderRadius: 4,
								border: '#27ae60 1px solid',
								borderBottom: 'red 2px solid',
								marginTop: 10,
								float: 'left',
								marginLeft: 5,
								fontWeight: 800,
								fontSize: '0.8em',
								padding: 5,
							}}
							onClick={toggleTodo}>
							CANCEL
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

// TODO if todo is completed it cannot be edited
