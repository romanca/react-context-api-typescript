import React from 'react';

interface IProps {
	value: any;
	onChange: any;
}
 
const PickerButton: React.FC = ({ children }) => {
	return (
		<div
			style={{
				display: 'flex',
				padding: 5,
				alignItems: 'baseline',
				border: '1px solid black',
				width: 'fit-content',
				borderRadius: 5,
				cursor: 'pointer',
			}}>
			{children}
		</div>
	);
};

const PriorityPicker: React.FC<IProps> = ({ value, onChange }) => {
	return (
		<PickerButton>
			<div
				style={{
					width: 10,
					height: 10,
					borderRadius: '50%',
					marginRight: 5,
					border: '1px solid black',
				}}></div>
			{value ? <div>{value.label}</div> : 'Select Priority'}
		</PickerButton>
	);
};
export default PriorityPicker;
