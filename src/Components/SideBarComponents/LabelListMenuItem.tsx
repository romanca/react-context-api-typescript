import Icon from '../../Icon/Icon';
import { useLabelConfirmDialog } from '../../Providers/ModalProvider';
import { LabelList } from '../LabelList';
import styled from 'styled-components';
import React from 'react';

const ProjectsContainer = styled.div`
	display: flex;
	width: 90%;
	padding: 5px;
	margin: 5px;
	height: 20px;
	font-weight: 700;
`;

interface IProps {
	visible?: boolean;
	onClick?: () => void;
}

const LabelListMenuItem: React.FC<IProps> = () => {
	const openLabelConfirmDialog = useLabelConfirmDialog();
	const [visible, setVisible] = React.useState(false);

	const toggleProjects = () => {
		setVisible((current) => !current);
	};

	return (
		<div>
			<ProjectsContainer>
				<div style={{ width: '90%' }} onClick={toggleProjects}>
					Projects
				</div>
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
			{visible ? <LabelList /> : ''}
		</div>
	);
};

export default LabelListMenuItem;
