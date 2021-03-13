import { LabelList } from './LabelList';
import { TodoList } from './TodoList';
import styled from 'styled-components';
import { useLabelConfirmDialog } from '../Providers/ModalProvider';
import Icon from '../Icon/Icon';

const LayoutContainer = styled.div`
	display: flex;
`;

const SideBar = styled.div`
	background: #fafafa;
	width: 20%;
	height: 100vh;
`;

const MainContent = styled.div`
	width: 80%;
	height: 100vh;
	overflow: scroll;
`;
const SideBarHeader = styled.div`
	background: white;
	width: 100%;
	height: 5vh;
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
	const openLabelConfirmDialog = useLabelConfirmDialog();

	return (
		<div>
			<LayoutContainer>
				<SideBar>
					<SideBarHeader />
					<ProjectsContainer>
						<div style={{ width: '90%' }}>Projects</div>
						<button
							onClick={openLabelConfirmDialog}
							style={{
								border: 'none',
								outline: 'none',
								background: 'transparent',
								cursor: 'pointer',
							}}>
							<Icon name='plus' style={{ fontWeight: 100 }} />
						</button>
					</ProjectsContainer>
					<LabelList />
				</SideBar>
				<MainContent>
					<TodoList />
				</MainContent>
			</LayoutContainer>
		</div>
	);
};
export default Layout;
