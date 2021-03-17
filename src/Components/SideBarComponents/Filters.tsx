import styled from 'styled-components';

const TitleContainer = styled.div`
	width: 100%;
`;

const LabelItemContainer = styled.div`
	display: flex;
	padding: 10px;
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

const Filters = ({ toggleContent }: any) => {
	return (
		<div>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<FilterButton value='completed'>View completed</FilterButton>
				</TitleContainer>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<FilterButton value='all'>View all</FilterButton>
				</TitleContainer>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<FilterButton value='active'>View active</FilterButton>
				</TitleContainer>
			</LabelItemContainer>
		</div>
	);
};

export default Filters;
