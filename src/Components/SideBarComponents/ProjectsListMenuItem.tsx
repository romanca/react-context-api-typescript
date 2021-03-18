import React from 'react';
import Icon from '../../Icon/Icon';
import { useLabelConfirmDialog } from '../../Providers/ModalProvider';
import { LabelList } from '../LabelList';
import styled from 'styled-components';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

const ProjectsContainer = styled.div`
	display: flex;
	padding: 5px;
	margin: 5px;
	height: 20px;
	font-weight: 700;
`;
const LabelConfirmDialogButton = styled.button`
	border: none;
	outline: none;
	background: transparent;
	cursor: pointer;
	position: fixed;
	margin-left: 18%;
`;

interface IProps {
	visible?: boolean;
	onClick?: () => void;
}

const ProjectsListMenuItem: React.FC<IProps> = () => {
	const openLabelConfirmDialog = useLabelConfirmDialog();
	const [visible, setVisible] = React.useState(false);

	const toggleProjects = () => {
		setVisible((current) => !current);
	};

	return (
		<div>
			<ProjectsContainer onClick={toggleProjects}>
				{visible ? <Icon name='downArrow' /> : <Icon name='rightArrow' />}
				<div style={{ position: 'fixed', marginLeft: 15 }}>Projects</div>
				<LabelConfirmDialogButton onClick={openLabelConfirmDialog}>
					<Icon name='plus' style={{ fontWeight: 100, color: 'white' }} />
				</LabelConfirmDialogButton>
			</ProjectsContainer>
			<SlideDown>{visible ? <LabelList /> : ''}</SlideDown>
		</div>
	);
};

export default ProjectsListMenuItem;
