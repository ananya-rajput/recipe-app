import React from 'react';
import styled from 'styled-components';

import { Sidebar, Tabs } from './';

const Header = () => {
	return (
		<Style>
			<Sidebar />
			<Tabs />
		</Style>
	);
};

export default Header;

const Style = styled.div`
	background: #d9e9f1;
	overflow: hidden;
`;
