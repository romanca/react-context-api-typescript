import React from 'react';
import { TodoList } from './TodoList';
import styled from 'styled-components';
import useFilteredTodos from '../Hooks/useFilteredTodos';
import Search from './Search';
import FavoritesMenuItem from './SideBarComponents/FavoritesMenuItem';
import LabelListMenuItem from './SideBarComponents/LabelListMenuItem';
import FiltersMenuItem from './SideBarComponents/FiltersMenuItem';

const Header = styled.header`
	padding: 2px;
	background: #fafafa;
	color: white;
	height: 5vh;
`;

const LayoutContainer = styled.div`
	display: flex;
`;

const SideBar = styled.div`
	background: #fafafa;
	width: 20%;
	height: 95vh;
`;

const MainContent = styled.div`
	width: 80%;
	height: 95vh;
	overflow: scroll;
`;

const ProjectsContainer = styled.div`
	display: flex;
	width: 90%;
	padding: 5px;
	margin: 5px;
	height: 20px;
	font-weight: 700;
`;

const Layout = () => {
	const [valueSelect, setValueSelect] = React.useState('all');
	const {
		renderCompletedTodos,
		renderAllTodos,
		renderActiveTodos,
		renderPriorityLowTodos,
		renderPriorityMediumTodos,
		renderPriorityHighTodos,
		handleChange,
		searchTerm,
	} = useFilteredTodos();

	const switchContent = (value: any) => {
		switch (value) {
			case 'completed':
				return <div>{renderCompletedTodos()}</div>;
			case 'all':
				return <div>{renderAllTodos()}</div>;
			case 'active':
				return <div>{renderActiveTodos()}</div>;
			case 'priorityLow':
				return <div>{renderPriorityLowTodos()}</div>;
			case 'priorityMiddle':
				return <div>{renderPriorityMediumTodos()}</div>;
			case 'priorityHigh':
				return <div>{renderPriorityHighTodos()}</div>;
			default:
				return null;
		}
	};

	return (
		<div>
			<Header>
				<Search handleChange={handleChange} searchTerm={searchTerm} />
			</Header>
			<LayoutContainer>
				<SideBar>
					<FavoritesMenuItem />
					<LabelListMenuItem />
					<FiltersMenuItem />
				</SideBar>
				<MainContent>
					<TodoList valueSelect={valueSelect} switchContent={switchContent} />
				</MainContent>
			</LayoutContainer>
		</div>
	);
};
export default Layout;
