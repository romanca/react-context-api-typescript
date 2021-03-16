import React from 'react';
import { Switch as SwitchRaw } from 'evergreen-ui';

interface IProps {
	onChange: any;
	checked: boolean;
}

const Switch: React.FC<IProps> = () => {
	const [checked, setChecked] = React.useState(false);

	const handleChange = (e: any) => {
		setChecked(e.target.checked);
	};
	return (
		<div>
			<SwitchRaw onChange={handleChange} checked={checked} height={20} />
		</div>
	);
};
export default Switch;
