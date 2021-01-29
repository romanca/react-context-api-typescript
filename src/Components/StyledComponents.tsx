import styled from 'styled-components';

export const Container = styled.div`
	padding: 15px;
	margin-bottom: 15px;
	border-radius: 5px;
	list-style: none;
	border: 1px solid black;
`;
export const TodoListContainer = styled.div`
	display: flex;
	width: 100%;
`;
export const CheckBox = styled.input`
	margin-top: auto;
	margin-bottom: auto;
`;

export const Input = styled.input`
	height: 30px;
	outline: none;
	width: 100%;
	border: none;
	outline: none;
	background: transparent;
	border-bottom: 1px solid black;
	padding-left: 5px;
	margin-left: 5px;
	font-size: 17px;
	color: teal;
`;

export const GreenButton = styled.button`
	height: 30px;
	width: 30px;
	// color: ${(props) => props.theme.defaultBlack};
	color: green;
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	border-radius: 50%;
	font-size: 20px;
	margin-left: 5px;
`;
export const RedButton = styled.button`
	height: 30px;
	width: 30px;
	// color: ${(props) => props.theme.defaultBlack};
	color: red;
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	border-radius: 50%;
	font-size: ${({ theme: { fontSizes } }) => fontSizes.small};
	margin-left: 5px;
`;

export const TodoFormContainer = styled.div`
	padding: 5px;
`;
