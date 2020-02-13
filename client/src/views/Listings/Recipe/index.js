import React from 'react';

import {
	Tag,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	IconButton
} from '@dailykit/ui';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ViewWrapper } from '../../../components/Styled/ViewWrapper';
import TableWrapper from '../../../components/Styled/TableWrapper';
import Menu from '../../../components/Menu';

export default function RecipeListing() {
	const data = [
		{
			recipe: {
				name: 'Chilli Chicken',
				id: 'R-450',
				cost: 1.12,
				owner: 'BBQ',
				author: 'Jr. Demolf',
				ownerType: 'outsourced',
				royaltyFee: '0.18% / sale'
			}
		},
		{
			recipe: {
				name: 'Biriyani',
				id: 'R-570',
				cost: 2.52,
				owner: 'BBQ',
				author: 'Chef Sanjeev',
				ownerType: 'self-owned',
				royaltyFee: ''
			}
		}
	];

	return (
		<ViewWrapper>
			<Menu title="Recipes" />

			<TableWrapper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Recipe Name</TableCell>
							<TableCell>Recipe Id</TableCell>
							<TableCell>Owner Type</TableCell>
							<TableCell>Royalty Fee</TableCell>
							<TableCell>Recipe Author</TableCell>
							<TableCell>Recipe Owner</TableCell>
							<TableCell>Recipe Cost</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => (
							<TableRow key={index}>
								<TableCell>{row.recipe.name}</TableCell>
								<TableCell>{row.recipe.id}</TableCell>
								<TableCell>
									<Tag>{row.recipe.ownerType}</Tag>
								</TableCell>
								<TableCell>{row.recipe.royaltyFee}</TableCell>
								<TableCell>{row.recipe.owner}</TableCell>
								<TableCell>{row.recipe.name}</TableCell>
								<TableCell>$ {row.recipe.cost}</TableCell>
								<TableCell>
									<IconButton
										style={{ display: 'inline', margin: '5px' }}
										type="ghost"
									>
										<FaEdit style={{ color: '#888D9D' }} />
									</IconButton>
									<IconButton
										style={{ display: 'inline', margin: '5px' }}
										type="ghost"
									>
										<FaTrash style={{ color: 'red' }} />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableWrapper>
		</ViewWrapper>
	);
}
