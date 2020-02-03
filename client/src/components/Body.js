import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Home, Ingredients, Stations, Ingredient } from './';

const Body = () => {
	const { currentTab } = useSelector(state => state.tabs);

	const whatToDisplay = () => {
		switch (currentTab?.type) {
			case 'list':
				return currentTab.title === 'Ingredients' ? (
					<Ingredients />
				) : (
					<Stations />
				);
			case 'form':
				return currentTab.data === undefined ? (
					<Ingredient />
				) : (
					<Ingredient data={currentTab.data} />
				);
			default:
				return <Home />;
		}
	};

	return <Style>{whatToDisplay()}</Style>;
};

export default Body;

const Style = styled.div`
	padding: 50px;
`;
