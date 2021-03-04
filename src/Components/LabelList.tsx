import React from 'react';
import { LabelItem } from './LabelItem';
import { useLabelState, useLabelActions } from '../Hooks';
import { useLabelConfirmDialog } from '../Providers/ModalProvider';
import Icon from '../Icon/Icon';
import { ModalButton } from '../Modal/Modal';

export const LabelList = () => {
	const { labels, selectedLabel } = useLabelState();
	const { setSelectedLabel, removeLabel, editLabel } = useLabelActions();

	const openModalDialog = useLabelConfirmDialog();

	return (
		<div>
			<ModalButton onClick={openModalDialog}>
				<Icon name='plus' />
			</ModalButton>
			{labels.map((label) => (
				<LabelItem
					label={label}
					key={label.id}
					handleSelected={setSelectedLabel}
					isSelected={selectedLabel?.id === label.id}
					removeLabel={removeLabel}
					editLabel={editLabel}
				/>
			))}
		</div>
	);
};
