import React from 'react';

import {
	IconButton,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Checkbox
} from '@dailykit/ui';

// Icons
import { AddIcon } from '../../../assets/icons';

// State
import { Context } from '../../../store/tabs';

// Styled
import {
	StyledWrapper,
	StyledTableHeader,
	StyledTableActions,
	StyledHeader,
	StyledContent
} from '../styled';

const RecipesListing = () => {
	const { state, dispatch } = React.useContext(Context);
	const addTab = (title, view) => {
		dispatch({
			type: 'ADD_TAB',
			payload: { type: 'forms', title, view, index: state.forms.length }
		});
	};
	return (
		<StyledWrapper>
			<StyledHeader>
				<h1>Recipes</h1>
				<p> pagination </p>
			</StyledHeader>
			<StyledTableHeader>
				<p>filters</p>
				<StyledTableActions>
					<IconButton
						type="solid"
						onClick={() => addTab('Untitled Recipe', 'recipe')}
					>
						<AddIcon color="#fff" size={24} />
					</IconButton>
				</StyledTableActions>
			</StyledTableHeader>
			<StyledContent>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								<Checkbox checked={false} />
							</TableCell>
							<TableCell> Recipe Name </TableCell>
							<TableCell> Recipe Id </TableCell>
							<TableCell> Owner Type </TableCell>
							<TableCell> Royalty Fee </TableCell>
							<TableCell> Recipe Author </TableCell>
							<TableCell> Recipe Owner </TableCell>
							<TableCell> Recipe Cost </TableCell>
							<TableCell> </TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</StyledContent>
		</StyledWrapper>
	);
};

export default RecipesListing;
