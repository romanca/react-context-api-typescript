import React from 'react';
import { LabelItem } from './LabelItem';
import { useLabels, useLabelActions } from '../Providers/TodoProvider';
import { useConfirmDialog } from '../Providers/ModalProvider';
import Icon from '../Icon/Icon';
import { ModalButton } from '../Modal/Modal';

export const LabelList = () => {
	const { labels } = useLabels();
	const openModalDialog = useConfirmDialog();

	const {
		selected,
		handleSelected,
		removeLabel,
		editLabel,
	} = useLabelActions();

	return (
		<div>
			<ModalButton onClick={openModalDialog}>
				<Icon name='plus' />
			</ModalButton>
			{labels.map((label) => (
				<LabelItem
					label={label}
					key={label.id}
					handleSelected={handleSelected}
					isSelected={selected === label}
					removeLabel={removeLabel}
					editLabel={editLabel}
				/>
			))}
		</div>
	);
};