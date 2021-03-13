import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import { useTodoActions } from '../Hooks';
import { formatDateToTodoDate } from '../shared/date-formatter';
import styled from 'styled-components';
import DatePicker from '../Wrappers/DatePicker';

const TodoListItemContainer = styled.div`
	display: flex;
	margin-top: 15px;
	margin-bottom: 15px;
	width: 100%;
`;
const TodoListItemContentContainer = styled.div`
	paddingleft: 5px;
	padding: 10px;
	display: flex;
	border: 1px solid black;
	width: 100%;
	border-radius: 5px;
`;
const TodoListItemConent = styled.div`
	width: 100%;
	word-break: break-all;
`;
const Span = styled.span`
	width: 80%;
`;

const DateContainer = styled.div`
	font-size: 12px;
	margin-top: 5px;
`;

const Input = styled.input`
	margin: auto;
	margin-right: 5px;
	width: 1.3em;
	height: 1.3em;
	background-color: white;
	border-radius: 50%;
	border: 1px solid #ddd;
	-webkit-appearance: none;
	outline: none;
	cursor: pointer;
	:checked {
		background-color: green;
	}
`;

const MainButton = styled.button`
	font-size: 15px;
	cursor: pointer;
	text-align: center;
	margin: auto;
	border: none;
	outline: none;
	background: transparent;
`;
const DropDownContainer = styled.div`
	border: 1px solid grey;
	border-radius: 5px;
	position: absolute;
	background: #f1f1f1;
`;
const DropDownEditButton = styled.div`
	background: white;
	padding: 5px;
	margin: 2px;
	cursor: pointer;
	display: flex;
`;
const DropDownRemoveButton = styled.div`
	background: white;
	padding: 5px;
	margin: 2px;
	cursor: pointer;
	display: flex;
`;
const DropDownFavoritesButton = styled.div`
	background: white;
	padding: 5px;
	cursor: pointer;
	margin: 2px;
`;

const SaveButton = styled.button`
	background: tomato;
	border: 1px solid tomato;
	outline: none;
	padding: 8px;
	border-radius: 5px;
	color: white;
	font-weight: 550;
	cursor: pointer;
`;
const CancelButton = styled.button`
	background: transparent;
	outline: none;
	padding: 8px;
	border-radius: 5px;
	font-weight: 550;
	margin-left: 5px;
	border: 1px solid #eeeeee;
	cursor: pointer;
`;
const LabelButtonContainer = styled.div`
	margin-left: 20px;
`;

const EditInput = styled.input`
	width: 100%;
	border: none;
	outline: none;
	padding-bottom: 5px;
`;
const SelectTodoItem = styled.select`
	height: 30px;
	outline: none;
	border: 1px solid black;
	border-radius: 5px;
`;

interface IProps {
	todo: Todo;
}

export const TodoListItem: React.FC<IProps> = ({ todo }) => {
	const { editTodo, completeTodo } = useTodoActions();
	const [open, setOpen] = useState(false);
	const [todoTitle, setTodoTitle] = useState('');
	const [todoPriority, setTodoPriority] = useState('');
	const { removeTodo } = useTodoActions();
	const [visible, setVisible] = useState(false);
	const [todoDate, setTodoDate] = useState();

	const handleOpenCloseMenu = () => {
		setVisible((current) => !current);
	};

	const handleCloseMenu = () => {
		setVisible(false);
	};
	const toggleTodo = () => {
		setOpen((current) => {
			if (!current) {
				setTodoTitle(todo.text);
				setTodoPriority(todo.priority);
			} else {
				setTodoTitle('');
				setTodoPriority('');
			}
			return !current;
		});
		handleCloseMenu();
	};
	const handleChange = (e: any) => {
		setTodoTitle(e.target.value);
	};

	const handlePriorityChange = (e: any) => {
		setTodoPriority(e.target.value);
	};
	const handleEditTodoDone = () => {
		editTodo({
			...todo,
			text: todoTitle,
			priority: todoPriority,
			date: todoDate,
		});
		toggleTodo();
		handleCloseMenu();
	};

	return (
		<div>
			{!open ? (
				<TodoListItemContainer>
					<Input
						type='checkbox'
						defaultChecked={todo.complete}
						onClick={() => {
							completeTodo(todo);
						}}
					/>
					<TodoListItemContentContainer>
						<TodoListItemConent>
							<div>{todo.text}</div>
							<DateContainer>{formatDateToTodoDate(todo.date)}</DateContainer>
						</TodoListItemConent>
						<div>
							<MainButton onClick={handleOpenCloseMenu}>
								<Icon name='dots' />
							</MainButton>
							<div>
								{visible ? (
									<DropDownContainer>
										<DropDownEditButton onClick={toggleTodo}>
											<Span>Edit</Span>
											<Icon name='edit' />
										</DropDownEditButton>
										<DropDownRemoveButton onClick={() => removeTodo(todo.id)}>
											<Span>Remove</Span>
											<Icon name='remove' />
										</DropDownRemoveButton>
										<DropDownFavoritesButton>
											Add to favorites
										</DropDownFavoritesButton>
									</DropDownContainer>
								) : null}
							</div>
						</div>
					</TodoListItemContentContainer>
				</TodoListItemContainer>
			) : (
				<div>
					<TodoListItemContainer>
						<Input
							style={{}}
							type='checkbox'
							defaultChecked={todo.complete}
							onClick={() => {
								completeTodo(todo);
							}}
						/>
						<TodoListItemContentContainer>
							<div style={{ width: '100%' }}>
								<EditInput
									type='text'
									value={todoTitle}
									onChange={handleChange}
								/>
								<SelectTodoItem
									value={todoPriority}
									onChange={handlePriorityChange}>
									<option>Low</option>
									<option>Medium</option>
									<option>High</option>
								</SelectTodoItem>
								<DatePicker
									selected={todoDate}
									onChange={setTodoDate}
									placeholder={'Select date'}
								/>
							</div>
						</TodoListItemContentContainer>
					</TodoListItemContainer>
					<LabelButtonContainer>
						<SaveButton onClick={handleEditTodoDone}>Save</SaveButton>
						<CancelButton onClick={toggleTodo}>Cancel</CancelButton>
					</LabelButtonContainer>
				</div>
			)}
		</div>
	);
};
