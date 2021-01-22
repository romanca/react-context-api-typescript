import React from 'react';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';

interface IProps {
	children: any;
}

const Theme: React.FC<IProps> = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default Theme;
