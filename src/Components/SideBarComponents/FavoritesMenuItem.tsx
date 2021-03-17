import React from 'react';
import styled from 'styled-components';
import Icon from '../../Icon/Icon';
import Favorites from '../FavoritesList';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

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
			<ProjectsContainer onClick={toggleFavorites}>
				{visible ? <Icon name='downArrow' /> : <Icon name='rightArrow' />}
				<div style={{ marginLeft: 15, position: 'fixed' }}>Favorites</div>
			</ProjectsContainer>
			<SlideDown className={'my-dropdown-slidedown'}>
				{visible ? <Favorites /> : ''}
			</SlideDown>
		</div>
	);
};

export default FavoritesMenuItem;
