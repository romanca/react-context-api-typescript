import React from 'react';
import { Switch as SwitchRaw } from 'evergreen-ui';

const Switch = () => {
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
