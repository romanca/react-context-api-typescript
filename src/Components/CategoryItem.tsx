import React from 'react';

interface IProps {
	category: Category;
	handleSelected: (category: Category) => void;
	isSelected: boolean;
}

export const CategoryItem: React.FC<IProps> = ({
	category,
	handleSelected,
	isSelected,
}) => {
	return (
		<div
			onClick={() => handleSelected(category)}
			style={{ backgroundColor: isSelected ? 'red' : undefined }}>
			{category.title}
		</div>
	);
};
