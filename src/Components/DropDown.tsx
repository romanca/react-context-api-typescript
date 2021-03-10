import React from 'react';
import { useLabelActions } from '../Hooks';
import Icon from '../Icon/Icon';
import styled from 'styled-components';

const MainButton = styled.button`
	font-size: 15px;
	cursor: pointer;
	text-align: center;
	margin: auto;
	border: none;
	outline: none;
	background: transparent;
`;
const DropDownContainer = styled.div`
	border: 1px solid grey;
	border-radius: 5px;
	position: absolute;
	background: #f1f1f1;
`;
const DropDownEditButton = styled.div`
	background: white;
	padding: 5px;
	margin: 2px;
	display: flex;
`;
const DropDownRemoveButton = styled.div`
	background: white;
	padding: 5px;
	margin: 2px;
	display: flex;
`;
const DropDownFavoritesButton = styled.div`
	background: white;
	padding: 5px;
	margin: 2px;
`;

interface IProps {
	label: Label;
	toggleLabel: () => void;
}

const DropDownMenu: React.FC<IProps> = ({ label, toggleLabel }) => {
	const [open, setOpen] = React.useState(false);
	const { removeLabel } = useLabelActions();

	const handleLOpenMenu = () => {
		setOpen(true);
	};

	return (
		<div>
			<MainButton onClick={handleLOpenMenu}>
				<Icon name='dots' />
			</MainButton>
			<div>
				{open ? (
					<DropDownContainer>
						<DropDownEditButton onClick={toggleLabel}>
							<span style={{ width: '80%' }}>Edit</span>
							<Icon name='edit' />
						</DropDownEditButton>
						<DropDownRemoveButton onClick={() => removeLabel(label.id)}>
							<span style={{ width: '80%' }}>Remove</span>
							<Icon name='remove' />
						</DropDownRemoveButton>
						<DropDownFavoritesButton>Add to favorites</DropDownFavoritesButton>
					</DropDownContainer>
				) : null}
			</div>
		</div>
	);
};
export default DropDownMenu;
