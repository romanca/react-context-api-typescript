import React, { useState } from 'react';
import Icon from '../Icon/Icon';
// TODO create error check for title if input is empty
interface IProps {
	label: Label;
	handleSelected: (label: Label) => void;
	isSelected: boolean;
	removeLabel: (label: Label) => void;
	editLabel: (label: Label) => void;
}

export const LabelItem: React.FC<IProps> = ({
	label,
	handleSelected,
	isSelected,
	removeLabel,
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
				<div
					style={{
						backgroundColor: isSelected ? 'teal' : undefined,
						border: '1px solid black',
						padding: 5,
						borderRadius: 5,
						margin: 5,
						color: 'black',
						boxShadow: '2px 2px 4px #000000',
						wordWrap: 'break-word',
					}}>
					<div onClick={() => handleSelected(label)}>{label.title}</div>
					<div style={{ display: 'flex' }}>
						<button
							onClick={() => removeLabel(label)}
							style={{
								outline: 'none',
								border: 'none',
								background: 'transparent',
								fontSize: 15,
								color: 'tomato',
							}}>
							<Icon name='remove' />
						</button>
						<button
							onClick={toggleLabel}
							style={{
								border: 'none',
								outline: 'none',
								background: 'transparent',
								fontSize: 15,
							}}>
							<Icon name='edit' />
						</button>
					</div>
				</div>
			) : (
				<div
					style={{
						backgroundColor: isSelected ? 'teal' : undefined,
						border: '1px solid black',
						padding: 5,
						borderRadius: 5,
						margin: 5,
						color: 'black',
						boxShadow: '2px 2px 4px #000000',
						display: 'flex',
					}}>
					<div>
						<input type='text' value={value} onChange={handleChange} />
					</div>
					<div onClick={() => handleSelected(label)}>
						<button
							onClick={handleEditLabel}
							style={{
								outline: 'none',
								border: 'none',
								background: 'transparent',
								color: 'black',
								fontSize: 15,
							}}>
							<Icon name='edit' />
						</button>
						<button
							onClick={toggleLabel}
							style={{
								color: 'tomato',
								outline: 'none',
								border: 'none',
								background: 'transparent',
								fontSize: 15,
							}}>
							X
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

//Todo Icon in button doesnt work
