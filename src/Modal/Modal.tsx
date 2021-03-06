import React from 'react';
import PopPop from 'react-poppop';
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
			}}
			closeModalDialog={closeModalDialog}>
			{content && content}
		</PopPop>
	);
};

export default ModalDialog;
