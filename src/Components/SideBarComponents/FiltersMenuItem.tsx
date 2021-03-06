import React from 'react';
import Filters from './Filters';
import styled from 'styled-components';
import Icon from '../../Icon/Icon';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

const ProjectsContainer = styled.div`
	display: flex;
	padding: 10px;
	padding-top: 10px;
	margin: 5px;
	font-weight: 700;
	:hover {
		cursor: pointer;
		border-radius: 5px;
	}
`;

interface IProps {
	onClick?: () => void;
	visible?: boolean;
	toggleContent: any;
}

const FiltersMenuItem: React.FC<IProps> = ({ toggleContent }: any) => {
	const [visible, setVisible] = React.useState(false);

	const toggleFilters = () => {
		setVisible((current) => !current);
	};

	return (
		<div>
			<ProjectsContainer onClick={toggleFilters}>
				{visible ? <Icon name='rightArrow' /> : <Icon name='downArrow' />}
				<div style={{ marginLeft: 15, position: 'fixed' }}>Filters</div>
			</ProjectsContainer>
			<div>
				<SlideDown>
					{!visible ? <Filters toggleContent={toggleContent} /> : ''}
				</SlideDown>
				{/* <SlideDown>
					{!visible ? <PriorityMenuItem toggleContent={toggleContent} /> : ''}
				</SlideDown> */}
			</div>
		</div>
	);
};
export default FiltersMenuItem;
