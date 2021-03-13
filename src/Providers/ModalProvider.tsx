import React, { createContext, useState } from 'react';
import { AddLabelForm } from '../Components/AddLabelForm';
import ModalDialog from '../Modal/Modal';

interface IProps {
	setDialog?: any;
	closeModalDialog?: any;
}

const ModalContext = createContext<IProps | null>(null);

const ModalProvider: React.FC<IProps> = ({ children }) => {
	const [visible, setVisible] = useState(false);
	const [content, setContent] = useState<React.FC>();

	const closeModalDialog = () => {
		setVisible(false);
	};

	const setDialog = (content: React.FC) => {
		setVisible(true);
		setContent(content);
	};

	return (
		<ModalContext.Provider value={{ setDialog, closeModalDialog }}>
			{children}
			<ModalDialog
				closeModalDialog={closeModalDialog}
				visible={visible}
				content={content}
			/>
		</ModalContext.Provider>
	);
};
export const useModal = () =>
	React.useContext(ModalContext) as Required<IProps>;

export const useLabelConfirmDialog = () => {
	const { setDialog } = useModal();

	return () => {
		setDialog(<AddLabelForm />);
	};
};

export default ModalProvider;
