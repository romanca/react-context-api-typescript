import React, { useState } from 'react';
import styled from 'styled-components';
import DropDownMenu from './DropDown';
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

	const toggleLabel = () => {
		setOpen((current) => {
			if (!current) {
				setValue(label.title);
			} else {
				setValue('');
			}
			return !current;
		});
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
					<DropDownMenu label={label} toggleLabel={toggleLabel} />
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
