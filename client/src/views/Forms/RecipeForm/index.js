import React, { useState } from 'react';

import { Text, TextButton, RadioGroup, ButtonTile } from '@dailykit/ui/';
import { ViewWrapper } from '../../../components/Styled/ViewWrapper';
import Menu from '../../../components/Menu';

export default function AddRecipe() {
	const [recipeName, setrecipeName] = useState('');
	const options = [
		{ id: 1, title: 'Vegetarian' },
		{ id: 2, title: 'Non-Vegetarian' },
		{ id: 3, title: 'Vegan' }
	];

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

			<div
				style={{ width: '100%', height: '96px', background: '#F3F3F3' }}
			></div>

			<div
				style={{
					marginTop: '24px',
					width: '100%',
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<RadioGroup
					options={options}
					active={2}
					onChange={option => console.log(option)}
				/>
			</div>

			<div
				style={{
					margin: '24px auto',
					width: '50%'
				}}
			>
				<ButtonTile type="primary" size="lg" text="Add photos to your recipe" />

				<Ingredients />
			</div>
		</ViewWrapper>
	);
}

function Ingredients() {
	return (
		<div style={{ width: '100%', marginTop: '20px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					<h4
						style={{
							fontSize: 16,
							color: '#888D9D'
						}}
					>
						Ingredients (0)
					</h4>
				</div>
			</div>
			<ButtonTile
				as="button"
				type="secondary"
				text="Add Ingredient"
				onClick={() => console.log('dkjfs')}
			/>
		</div>
	);
}