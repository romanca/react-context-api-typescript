import React from 'react';
import { CategoryItem } from './CategoryItem';
import { useCategories, useCategoryActions } from '../Providers/TodoProvider';

export const CategoryList = () => {
	const { categories } = useCategories();
	const { selected, handleSelected } = useCategoryActions();

	return (
		<div>
			{categories.map((category) => (
				<CategoryItem
					category={category}
					key={category.id}
					handleSelected={handleSelected}
					isSelected={selected === category}
				/>
			))}
		</div>
	);
};
