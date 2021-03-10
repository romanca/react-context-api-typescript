import { LabelItem } from './LabelItem';
import { useLabelState, useLabelActions } from '../Hooks';

export const LabelList = () => {
	const { labels, selectedLabel } = useLabelState();
	const { setSelectedLabel, editLabel } = useLabelActions();

	return (
		<div>
			{labels.map((label) => (
				<LabelItem
					label={label}
					key={label.id}
					handleSelected={setSelectedLabel}
					isSelected={selectedLabel?.id === label.id}
					editLabel={editLabel}
				/>
			))}
		</div>
	);
};
