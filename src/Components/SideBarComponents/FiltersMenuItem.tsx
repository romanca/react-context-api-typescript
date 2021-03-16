import React from 'react';
import Filters from '../Filters';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
	display: flex;
	width: 90%;
	padding: 5px;
	margin: 5px;
	height: 20px;
	font-weight: 700;
`;

interface IProps {
	onClick?: () => void;
	visible?: boolean;
}

const FiltersMenuItem: React.FC<IProps> = () => {
	const [visible, setVisible] = React.useState(false);

	const toggleFilters = () => {
		setVisible((current) => !current);
	};

	return (
		<div>
			<ProjectsContainer>
				<div style={{ width: '90%' }} onClick={toggleFilters}>
					Filters
				</div>
			</ProjectsContainer>
			{visible ? <Filters /> : ''}
		</div>
	);
};
export default FiltersMenuItem;
