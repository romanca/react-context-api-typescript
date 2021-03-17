import React from 'react';

const IconNamesMap = {
	edit: 'fa fa-pencil',
	remove: 'fa fa-trash',
	plus: 'fa fa-plus',
	dots: 'fa fa-ellipsis-h',
	rightArrow: 'fa fa-angle-right',
	downArrow: 'fa fa-angle-down',
};

export type IconName = keyof typeof IconNamesMap;

interface IProps {
	name: IconName;
	style?: any;
	color?: string;
	fontSize?: number;
}

const Icon: React.FC<IProps> = ({ name, color, style }) => {
	return (
		<div>
			<i className={IconNamesMap[name]} color={color} style={style} />
		</div>
	);
};
export default Icon;
