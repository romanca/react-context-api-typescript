import { LabelList } from './LabelList';
import { TodoList } from './TodoList';
import styled from 'styled-components';
import { useLabelConfirmDialog } from '../Providers/ModalProvider';
import Icon from '../Icon/Icon';

const LayoutContainer = styled.div`
	display: flex;
`;

const SideBar = styled.div`
	background: #f1f1f1;
	width: 20%;
	height: 100vh;
`;

const MainContent = styled.div`
	width: 80%;
	height: 100vh;
`;
const SideBarHeader = styled.div`
	background: white;
	width: 100%;
	height: 5vh;
`;

const Layout = () => {
	const openLabelConfirmDialog = useLabelConfirmDialog();

	return (
		<div>
			<LayoutContainer>
				<SideBar>
					<SideBarHeader />
					<div
						style={{
							display: 'flex',
							width: '90%',
							padding: 5,
							margin: 5,
							height: 20,
							fontWeight: 700,
						}}>
						<div style={{ width: '90%' }}>Projects</div>
						<button
							onClick={openLabelConfirmDialog}
							style={{
								border: 'none',
								outline: 'none',
								background: 'transparent',
							}}>
							<Icon name='plus' style={{ fontWeight: 100 }} />
						</button>
					</div>
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
