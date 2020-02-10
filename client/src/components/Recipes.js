import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Table, Loader } from '.';
import { newTab } from '../state/actions';

const Ingredients = () => {
	const dispatch = useDispatch();

	const [ingredients, setIngredients] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/ingredients');
				const res = await response.json();
				if (res.success) {
					setIngredients(res.data.ingredients);
					setLoading(false);
				} else {
					throw Error(res.message);
				}
			} catch (e) {
				setLoading(false);
				console.log(e);
			}
		})();
	}, []);

	const addIngredienthandler = async () => {
		try {
			const response = await fetch('/api/ingredients/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const res = await response.json();
			if (res.success) {
				dispatch(
					newTab({
						type: 'form',
						title: res.data.name,
						data: {
							ingredient: {
								name: res.data.name,
								allergens: [],
								processings: []
							}
						}
					})
				);
			} else {
				throw Error(res.message);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const columns = {
		select: true,
		name: 'Name',
		variant: 'Variant',
		mode_of_fulfillment: 'Mode of FulFillment',
		stations: 'Stations',
		supplier_item: 'Supplier Item',
		availability: 'Availability',
		actions: true
	};

	return (
		<Style>
			{loading ? (
				<Loader />
			) : (
				<Table
					columns={columns}
					data={ingredients}
					addButtonHandler={addIngredienthandler}
				/>
			)}
		</Style>
	);
};

export default Ingredients;

const Style = styled.div``;
