import React, { useState } from 'react';

import { Text, TextButton } from '@dailykit/ui';
import { ViewWrapper } from '../../../components/Styled/ViewWrapper';
import Menu from '../../../components/Menu';

export default function AddRecipe() {
	const [recipeName, setrecipeName] = useState('');

	return (
		<ViewWrapper>
			<Menu>
				<div>
					<Text
						label="Untitled Recipe"
						name="recipeName"
						value={recipeName}
						onChange={e => {
							setrecipeName(e.target.value);
						}}
					/>
				</div>

				<div style={{ width: '100%', textAlign: 'right' }}>
					<TextButton type="ghost" style={{ margin: '0px 10px' }}>
						open in editor
					</TextButton>

					<TextButton type="ghost" style={{ margin: '0px 10px' }}>
						save and exit
					</TextButton>

					<TextButton type="solid" style={{ margin: '0px 10px' }}>
						Publish
					</TextButton>
				</div>
			</Menu>
		</ViewWrapper>
	);
}
