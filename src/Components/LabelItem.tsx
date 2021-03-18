import React, { useState } from 'react';
import styled from 'styled-components';
import { useLabelActions } from '../Hooks';
import Icon from '../Icon/Icon';
import { useTodoState } from '../Hooks/useTodos';

// TODO create error check for title if input is empty

const LabelItemContainer = styled.div`
	display: flex;
	padding: 5px;
	padding-top: 10px;
	margin: 5px;
	background: #2a2929;
	:hover {
		cursor: pointer;
		background: #2196f3;
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
	display: flex;
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
	padding-left: 10px;
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

const Circle = styled.div`
	width: 25px;
	height: 25px;
	line-height: 25px;
	border-radius: 50%;
	font-size: 15px;
	color: black;
	text-align: center;
	background: #673ab7;
	margin-right: 5px;
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
	const { todoList } = useTodoState();
	const result = todoList.filter((i) => i.categoryId === label.id).length;

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
						style={{
							fontWeight: isSelected ? 700 : undefined,
						}}>
						<Circle>{result}</Circle>
						{label.title}
					</TitleContainer>
					<div>
						<MainButton onClick={handleOpenCloseMenu}>
							<Icon name='dots' style={{ color: 'white' }} />
						</MainButton>
						<div>
							{visible ? (
								<DropDownContainer>
									<DropDownEditButton onClick={toggleLabel}>
										<span style={{ width: '80%', color: 'black' }}>Edit</span>
										<Icon name='edit' style={{ color: 'green' }} />
									</DropDownEditButton>
									<DropDownRemoveButton onClick={() => removeLabel(label.id)}>
										<span style={{ width: '80%', color: 'black' }}>Remove</span>
										<Icon name='remove' style={{ color: 'tomato' }} />
									</DropDownRemoveButton>
									<DropDownFavoritesButton
										defaultChecked={label.favorite}
										onClick={() => {
											favoriteLabel(label);
										}}>
										{!label.favorite ? (
											<div style={{ color: 'black' }}>Add to Favorites</div>
										) : (
											<div style={{ color: 'black' }}>
												Remove from Favorites
											</div>
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
