import { LabelItem } from './LabelItem';
import { useLabelState, useLabelActions } from '../Hooks';

export const LabelList = () => {
	const { labels, selectedLabel } = useLabelState();
	const { setSelectedLabel, removeLabel, editLabel } = useLabelActions();

	return (
		<div>
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
