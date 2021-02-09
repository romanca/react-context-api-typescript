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
			contentStyle={{
				transition: 'all 0.3s',
				borderRadius: '3px',
				zIndex: 2000,
				position: 'relative',
				boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
				width: 300,
				height: 300,
			}}
			closeModalDialog={closeModalDialog}>
			{content && content}
			<div style={{ marginTop: -25, background: 'green', width: 50 }}>
				<button
					style={{
						width: 50,
						height: 25,
						background: 'red',
						outline: 'none',
						border: 'none',
					}}
					onClick={closeModalDialog}>
					Close
				</button>
			</div>
		</PopPop>
	);
};

export default ModalDialog;
