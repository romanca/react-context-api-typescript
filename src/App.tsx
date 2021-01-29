import React from 'react';
import { TodoList } from './Components/TodoList';
import TodoProvider from './Providers/TodoProvider';
import Theme from './Providers/ThemeProvider';
import { LabelList } from './Components/LabelList';
import { AddTodoForm } from './Components/AddTodoForm';
import ModalProvider from './Providers/ModalProvider';
import styled from 'styled-components';

const MainContainer = styled.div`
	width: 100%;
	height: 700px;
	padding: 10;
	display: flex;
	background: red;
	margin-top: 20px;
`;
const SideBar = styled.div`
	flex-direction: row;
	border: 1px solid black;
	width: 25%;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 2px 2px 4px #000000;
	over-flow: scroll;
`;
const TodosContainer = styled.div`
	width: 100%;
	padding: 10px;
`;

const App = () => {
	return (
		<TodoProvider>
			<ModalProvider>
				<Theme>
					<MainContainer>
						<SideBar>
							<LabelList />
						</SideBar>
						<TodosContainer>
							<TodoList />

							<AddTodoForm />
						</TodosContainer>
					</MainContainer>
				</Theme>
			</ModalProvider>
		</TodoProvider>
	);
};

export default App;
