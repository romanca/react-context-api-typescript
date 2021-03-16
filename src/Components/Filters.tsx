import styled from 'styled-components';

const TitleContainer = styled.div`
	width: 100%;
`;

const LabelItemContainer = styled.div`
	display: flex;
	width: 90%;
	padding: 10px;
	padding-top: 10px;
	:hover {
		cursor: pointer;
		background: white;
		border-radius: 5px;
	}
`;

const Filters = ({ toggleContent }: any) => {
	return (
		<div style={{}}>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<button
						style={{
							border: 'none',
							outline: 'none',
							background: 'transparent',
							cursor: 'pointer',
							width: '100%',
							textAlign: 'left',
						}}
						value='completed'>
						Completed
					</button>
				</TitleContainer>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<button
						style={{
							border: 'none',
							outline: 'none',
							background: 'transparent',
							cursor: 'pointer',
							width: '100%',
							textAlign: 'left',
						}}
						value='all'>
						All
					</button>
				</TitleContainer>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<button
						style={{
							border: 'none',
							outline: 'none',
							background: 'transparent',
							cursor: 'pointer',
							width: '100%',
							textAlign: 'left',
						}}
						value='active'>
						Active
					</button>
				</TitleContainer>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<button
						style={{
							border: 'none',
							outline: 'none',
							background: 'transparent',
							cursor: 'pointer',
							width: '100%',
							textAlign: 'left',
						}}
						value='priorityLow'>
						Priority low
					</button>
				</TitleContainer>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<button
						style={{
							border: 'none',
							outline: 'none',
							background: 'transparent',
							cursor: 'pointer',
							width: '100%',
							textAlign: 'left',
						}}
						value='priorityMiddle'>
						Priority middle
					</button>
				</TitleContainer>
			</LabelItemContainer>
			<LabelItemContainer>
				<TitleContainer onClick={toggleContent}>
					<button
						style={{
							border: 'none',
							outline: 'none',
							background: 'transparent',
							cursor: 'pointer',
							width: '100%',
							textAlign: 'left',
						}}
						value='priorityHigh'>
						Priority high
					</button>
				</TitleContainer>
			</LabelItemContainer>
		</div>
	);
};

export default Filters;
