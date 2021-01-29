import React from 'react';
import PopPop from 'react-poppop';
import styled from 'styled-components';

export const ModalButton = styled.button`
	outline: none;
	border: none;
	background: transparent;
	padding: 10px;
	cursor: pointer;
`;

interface IProps {
	content?: any;
	closeModalDialog: () => void;
	visible: boolean;
}

const ModalDialog: React.FC<IProps> = ({
	visible,
	closeModalDialog,
	content,
}) => {
	return (
		<PopPop
			open={visible}
			contentStyle={{ width: 400 }}
			closeModalDialog={closeModalDialog}>
			{content && content}
			<ModalButton onClick={closeModalDialog}>X</ModalButton>
		</PopPop>
	);
};

export default ModalDialog;
