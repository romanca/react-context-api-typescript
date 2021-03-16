import React from 'react';
import styled from 'styled-components';
import Favorites from '../FavoritesList';

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

const FavoritesMenuItem: React.FC<IProps> = () => {
	const [visible, setVisible] = React.useState(false);

	const toggleFavorites = () => {
		setVisible((current) => !current);
	};

	return (
		<div>
			<ProjectsContainer>
				<div style={{ width: '90%' }} onClick={toggleFavorites}>
					Favorites
				</div>
			</ProjectsContainer>
			{visible ? <Favorites /> : ''}
		</div>
	);
};

export default FavoritesMenuItem;
