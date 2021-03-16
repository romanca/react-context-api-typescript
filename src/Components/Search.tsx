import styled from 'styled-components';

const AddTodoInput = styled.input`
	font-size: 15px;
	outline: none;
	border-radius: 5px;
	border: 1px solid black;
	padding: 5px;
	margin-top: 5px;
	padding-left: 10px;
`;

const Search = ({ searchTerm, handleChange }: any) => {
	return (
		<div style={{ marginLeft: 15 }}>
			<AddTodoInput
				type='text'
				value={searchTerm}
				onChange={handleChange}
				placeholder='Search'
			/>
		</div>
	);
};

export default Search;
