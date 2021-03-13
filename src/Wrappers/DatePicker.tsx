import React from 'react';
import DatePickerRaw from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDateToTodoDate } from '../shared/date-formatter';
import styled from 'styled-components';

const DatePickerButton = styled.button`
	height: 30px;
	outline: none;
	border: 1px solid black;
	border-radius: 5px;
	background: transparent;
	margin-left: 5px;
`;

interface IProps {
	onChange: any;
	selected: any;
	placeholder?: any;
}
interface TProps {
	onClick?: () => void;
	value?: any;
	placeholderText?: any;
}

class DatePickerInput extends React.Component<TProps> {
	render() {
		const { onClick, value, placeholderText } = this.props;
		const finalValue = value ? formatDateToTodoDate(value) : placeholderText;
		return (
			<div onClick={onClick}>
				<DatePickerButton>{finalValue}</DatePickerButton>
			</div>
		);
	}
}

const DatePicker: React.FC<IProps> = ({ onChange, selected, placeholder }) => {
	return (
		<DatePickerRaw
			onChange={onChange}
			selected={selected}
			minDate={new Date()}
			customInput={<DatePickerInput placeholderText={placeholder} />}
		/>
	);
};
export default DatePicker;
