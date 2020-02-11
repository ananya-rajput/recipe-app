import React from 'react';

import Menu from '../components/Menu';

import { StyledCardList, StyledCard } from '../components/Styled/Card';
import { ViewWrapper } from '../components/Styled/ViewWrapper';

export default function Home() {
	return (
		<ViewWrapper>
			<Menu />

			<StyledCardList>
				<StyledCard>
					<h2>Recipes</h2>
					<p>76 created so far</p>
					<span data-type="status">All available</span>
					<span data-type="link" onClick={() => {}}>
						Go to Users >
					</span>
				</StyledCard>
				<StyledCard>
					<h2>Ingredients</h2>
					<p>54 created so far</p>
					<span data-type="status">All available</span>
					<span data-type="link" onClick={() => {}}>
						Go to Users >
					</span>
				</StyledCard>
			</StyledCardList>
		</ViewWrapper>
	);
}
