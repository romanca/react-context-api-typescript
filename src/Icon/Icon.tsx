import React from 'react';

const IconNamesMap = {
	edit: 'fa fa-pencil',
	remove: 'fa fa-trash',
	plus: 'fa fa-plus',
};

export type IconName = keyof typeof IconNamesMap;

interface IProps {
	name: IconName;
	style?: unknown;
	color?: string;
	fontSize?: number;
}

const Icon: React.FC<IProps> = ({ name, color }) => {
	return (
		<div>
			<i className={IconNamesMap[name]} color={color} />
		</div>
	);
};
export default Icon;
