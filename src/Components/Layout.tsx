import React from 'react';
import { TodoList } from './TodoList';
import styled from 'styled-components';
import useFilteredTodos from '../Hooks/useFilteredTodos';
import Search from './Search';
import FavoritesMenuItem from './SideBarComponents/FavoritesMenuItem';
import LabelListMenuItem from './SideBarComponents/ProjectsListMenuItem';
import FiltersMenuItem from './SideBarComponents/FiltersMenuItem';

const Header = styled.header`
	padding: 2px;
	background: #004d40;
	color: white;
	height: 5vh;
`;

const LayoutContainer = styled.div`
	display: flex;
`;

const SideBar = styled.div`
	background: #212121;
	width: 22%;
	height: 95vh;
	color: white;
`;

const MainContent = styled.div`
	width: 78%;
	height: 95vh;
	overflow: scroll;
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

	const toggleContent = (e: any) => {
		setValueSelect(e.target.value);
	};

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
					<FiltersMenuItem toggleContent={toggleContent} />
				</SideBar>
				<MainContent>
					<TodoList valueSelect={valueSelect} switchContent={switchContent} />
				</MainContent>
			</LayoutContainer>
		</div>
	);
};
export default Layout;
