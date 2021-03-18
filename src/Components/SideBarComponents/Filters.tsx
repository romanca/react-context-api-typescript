import styled from 'styled-components';
import useFilteredTodos from '../../Hooks/useFilteredTodos';

const TitleContainer = styled.div`
	width: 100%;
`;

const LabelItemContainer = styled.div`
	display: flex;
	padding: 5px;
	padding-top: 10px;
	margin: 5px;
	background: #2a2929;
	:hover {
		cursor: pointer;
		background: #2196f3;
		border-radius: 5px;
	}
`;

const FilterButton = styled.button`
	border: none;
	outline: none;
	background: transparent;
	cursor: pointer;
	width: 100%;
	text-align: left;
	color: white;
	margin-left: 10px;
	font-size: 15px;
`;

const Circle = styled.div`
	width: 25px;
	height: 25px;
	line-height: 25px;
	border-radius: 50%;
	font-size: 15px;
	color: black;
	text-align: center;
	background: #e91e63;
`;

const PriorityButton = styled.button`
	border: none;
	outline: none;
	background: transparent;
	cursor: pointer;
	text-align: left;
	color: white;
	margin-left: 10px;
	font-size: 15px;
`;

const Filters = ({ toggleContent }: any) => {
	const {
		completedTodos,
		allTodos,
		activeTodos,
		priorityLowTodos,
		priorityMediumTodos,
		priorityHighTodos,
	} = useFilteredTodos();

	return (
		<div>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<FilterButton value='completed'>View completed</FilterButton>
				</TitleContainer>
				<Circle>{completedTodos()}</Circle>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<FilterButton value='all'>View all</FilterButton>
				</TitleContainer>
				<Circle>{allTodos()}</Circle>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<FilterButton value='active'>View active</FilterButton>
				</TitleContainer>
				<Circle>{activeTodos()}</Circle>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<PriorityButton value='priorityLow'>Priority low</PriorityButton>
				</TitleContainer>
				<Circle>{priorityLowTodos()}</Circle>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<PriorityButton value='priorityMiddle'>
						Priority medium
					</PriorityButton>
				</TitleContainer>
				<Circle>{priorityMediumTodos()}</Circle>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<PriorityButton value='priorityHigh'>Priority high</PriorityButton>
				</TitleContainer>
				<Circle>{priorityHighTodos()}</Circle>
			</LabelItemContainer>
		</div>
	);
};

export default Filters;
