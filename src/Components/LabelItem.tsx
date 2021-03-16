import React, { useState } from 'react';
import styled from 'styled-components';
import { useLabelActions } from '../Hooks';
import Icon from '../Icon/Icon';
// TODO create error check for title if input is empty

const LabelItemContainer = styled.div`
	display: flex;
	width: 90%;
	padding: 10px;
	padding-top: 10px;
	margin: 5px;
	:hover {
		cursor: pointer;
		background: white;
		border-radius: 5px;
	}
`;

const LabelEditItemContainer = styled.div`
	width: 90%;
	padding: 10px;
	padding-top: 10px;
	margin: 5px;
	background: white;
	border-radius: 5px;
`;
const LabelEditInput = styled.input`
	border: none;
	border-bottom: 1px solid #bdbdbd;
	outline: none;
	width: 100%;
`;

const TitleContainer = styled.div`
	width: 100%;
`;

const SaveButton = styled.button`
	background: tomato;
	border: 1px solid tomato;
	outline: none;
	padding: 4px;
	border-radius: 5px;
	color: white;
	font-weight: 600;
	cursor: pointer;
	font-size: 10px;
`;
const CancelButton = styled.button`
	background: #f5f5f5;
	outline: none;
	padding: 4px;
	border-radius: 5px;
	font-weight: 600;
	margin-left: 5px;
	border: 1px solid #eeeeee;
	cursor: pointer;
	font-size: 10px;
`;
const LabelButtonContainer = styled.div`
	margin-top: 5px;
`;
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
	handleSelected: (label: Label) => void;
	isSelected: boolean;
	editLabel: (label: Label) => void;
}

export const LabelItem: React.FC<IProps> = ({
	label,
	handleSelected,
	isSelected,
	editLabel,
}) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const [visible, setVisible] = React.useState(false);
	const { removeLabel, favoriteLabel } = useLabelActions();

	const handleOpenCloseMenu = () => {
		setVisible((current) => !current);
	};

	const handleCloseMenu = () => {
		setVisible(false);
	};

	const toggleLabel = () => {
		setOpen((current) => {
			if (!current) {
				setValue(label.title);
			} else {
				setValue('');
			}
			return !current;
		});
		handleCloseMenu();
	};

	const handleChange = (e: any) => {
		setValue(e.target.value);
	};

	const handleEditLabel = () => {
		editLabel({
			...label,
			title: value,
		});
		toggleLabel();
		handleCloseMenu();
	};

	return (
		<div>
			{!open ? (
				<LabelItemContainer>
					<TitleContainer
						onClick={() => handleSelected(label)}
						style={{ fontWeight: isSelected ? 700 : undefined }}>
						{label.title}
					</TitleContainer>
					<div>
						<MainButton onClick={handleOpenCloseMenu}>
							<Icon name='dots' />
						</MainButton>
						<div>
							{visible ? (
								<DropDownContainer>
									<DropDownEditButton onClick={toggleLabel}>
										<span style={{ width: '80%' }}>Edit</span>
										<Icon name='edit' />
									</DropDownEditButton>
									<DropDownRemoveButton onClick={() => removeLabel(label.id)}>
										<span style={{ width: '80%' }}>Remove</span>
										<Icon name='remove' />
									</DropDownRemoveButton>
									<DropDownFavoritesButton
										defaultChecked={label.favorite}
										onClick={() => {
											favoriteLabel(label);
										}}>
										{!label.favorite ? (
											<div>Add to Favorites</div>
										) : (
											<div>Remove from Favorites</div>
										)}
									</DropDownFavoritesButton>
								</DropDownContainer>
							) : null}
						</div>
					</div>
				</LabelItemContainer>
			) : (
				<LabelEditItemContainer>
					<LabelEditInput type='text' value={value} onChange={handleChange} />
					<LabelButtonContainer onClick={() => handleSelected(label)}>
						<SaveButton onClick={handleEditLabel}>Save</SaveButton>
						<CancelButton onClick={toggleLabel}>Cancel</CancelButton>
					</LabelButtonContainer>
				</LabelEditItemContainer>
			)}
		</div>
	);
};
