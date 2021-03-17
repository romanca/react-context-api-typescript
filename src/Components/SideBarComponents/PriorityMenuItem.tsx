import React from 'react';
import styled, { keyframes } from 'styled-components';
import Icon from '../../Icon/Icon';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

const TitleContainer = styled.div`
	width: 100%;
`;

const LabelItemContainer = styled.div`
	display: flex;
	padding: 10px;
	padding-top: 10px;
	margin: 5px;
	background: #2a2929;
	:hover {
		cursor: pointer;
		background: #673ab7;
		border-radius: 5px;
	}
`;

const ProjectsContainer = styled.div`
	display: flex;
	padding: 5px;
	margin: 5px;
	height: 20px;
	font-weight: 700;
	margin-left: 15px;
`;

const PriorityItems = ({ toggleContent }: any) => {
	return (
		<div>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<button
						style={{
							border: 'none',
							outline: 'none',
							background: 'transparent',
							cursor: 'pointer',
							textAlign: 'left',
							color: 'white',
							marginLeft: '20px',
							fontSize: 15,
						}}
						value='priorityLow'>
						Priority low
					</button>
				</TitleContainer>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<button
						style={{
							border: 'none',
							outline: 'none',
							background: 'transparent',
							cursor: 'pointer',
							textAlign: 'left',
							color: 'white',
							marginLeft: '20px',
							fontSize: 15,
						}}
						value='priorityMiddle'>
						Priority medium
					</button>
				</TitleContainer>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<button
						style={{
							border: 'none',
							outline: 'none',
							background: 'transparent',
							cursor: 'pointer',
							textAlign: 'left',
							color: 'white',
							marginLeft: '20px',
							fontSize: 15,
						}}
						value='priorityHigh'>
						Priority high
					</button>
				</TitleContainer>
			</LabelItemContainer>
		</div>
	);
};

interface IProps {
	onClick?: () => void;
	visible?: boolean;
	toggleContent: any;
}

const PriorityMenuItem: React.FC<IProps> = ({ toggleContent }: any) => {
	const [visible, setVisible] = React.useState(false);

	const togglePriorities = () => {
		setVisible((current) => !current);
	};

	return (
		<div>
			<ProjectsContainer onClick={togglePriorities}>
				{visible ? <Icon name='downArrow' /> : <Icon name='rightArrow' />}
				<div style={{ marginLeft: 15, position: 'fixed' }}>Priorities</div>
			</ProjectsContainer>
			<SlideDown className={'my-dropdown-slidedown'}>
				{visible ? <PriorityItems toggleContent={toggleContent} /> : ''}
			</SlideDown>
		</div>
	);
};

export default PriorityMenuItem;
