import React from 'react';

import Menu from '../components/Menu';
import { DashboardTile } from '@dailykit/ui';
import { StyledCardList, StyledCard } from '../components/Styled/Card';
import { ViewWrapper } from '../components/Styled/ViewWrapper';

export default function Home() {
	return (
		<ViewWrapper>
			<Menu>
				<h1>Home</h1>
			</Menu>

			<StyledCardList>
				<DashboardTile
					title="Recipes"
					count="76"
					conf="All available"
					onClick={() => console.log('Navigate')}
				/>

				<DashboardTile
					title="Ingredients"
					count="29"
					conf="All available"
					onClick={() => console.log('Navigate')}
				/>
			</StyledCardList>
		</ViewWrapper>
	);
}
