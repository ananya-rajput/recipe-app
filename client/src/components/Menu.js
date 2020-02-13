import React from 'react';

import { StyledNavigator } from './Styled/Navigation';

export default function Menu({ title }) {
	return (
		<StyledNavigator>
			<h1>{title}</h1>

			<div className="search"></div>
		</StyledNavigator>
	);
}
