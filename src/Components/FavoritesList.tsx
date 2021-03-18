import { LabelItem } from './LabelItem';
import { useLabelState, useLabelActions } from '../Hooks/useLabels';

const Favorites = () => {
	const { labels, selectedLabel } = useLabelState();
	const { setSelectedLabel, editLabel } = useLabelActions();

	return (
		<div>
			{labels
				.filter((i) => i.favorite)
				.map((label) => (
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
export default Favorites;
