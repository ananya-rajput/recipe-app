import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { IconButton } from '@dailykit/ui';
import { FaFilter, FaPlus } from 'react-icons/fa';

import { PageHeading } from './';
import { newTab } from '../state/actions';

const Table = ({ columns, data, addButtonHandler }) => {
	const [currentCount, setCurrentCount] = React.useState(50);
	const [totalCount, setTotalCount] = React.useState(1350);
	const dispatch = useDispatch();

	return (
		<Style>
			<div className="header">
				<PageHeading text="Recipes" size={20} stats={29} />
				<div className="pagination">
					{currentCount} of {totalCount}
					<span> &lt; </span>
					<span> &gt; </span>
				</div>
			</div>
			<div className="operations">
				<div className="left">
					<div className="filters">
						<FaFilter /> Filters
					</div>
				</div>
				<div className="right">
					<div className="search">Search here</div>
					<div className="add">
						<IconButton type="solid" onClick={addButtonHandler}>
							<FaPlus />
						</IconButton>
					</div>
				</div>
			</div>
			<div className="body">
				<table>
					<thead>
						<tr>
							{Object.keys(columns).map(key => {
								if (key === 'select' && columns.select)
									return <th key={key}> Select </th>;
								if (key === 'actions' && columns.actions)
									return <th key={key}></th>;
								return <th key={key}> {columns[key]} </th>;
							})}
						</tr>
					</thead>
					<tbody>
						{data.map((record, i) => (
							<tr
								key={i}
								onClick={() =>
									dispatch(
										newTab({
											type: 'form',
											title: record.name,
											path: record.path
										})
									)
								}
							>
								{Object.keys(columns).map(key => {
									if (key === 'select' && columns.select)
										return <td key={key}> select </td>;
									if (key === 'actions' && columns.actions)
										return <td key={key}> edit delete </td>;
									return <td key={key}> {record[key]} </td>;
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Style>
	);
};

export default Table;

const Style = styled.div`
	color: #555b6e;

	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;

		.pagination {
			span:first-child {
				margin-left: 30px;
			}
		}
	}

	.operations {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;

		.right {
			display: flex;

			div:not(:last-child) {
				margin-right: 20px;
			}
		}
	}

	.body {
		display: flex;

		table {
			flex: 1;
			border-spacing: 0;

			thead {
				color: #888d9d;
				font-size: 12px;

				th {
					border-bottom: 1px solid #d8d8d8;
					font-weight: normal;
					padding: 12px 0;
					margin: 0;
					text-align: left;
				}
			}

			tbody {
				tr {
					border: 1px solid #f3f3f3 !important;

					&:hover {
						background: #eee;
						cursor: pointer;
					}
				}

				td {
					padding: 12px 0;
					border-bottom: 1px solid #f3f3f3;
				}

				td:first-child {
					border-left: 1px solid #f3f3f3;
				}

				td:last-child {
					border-right: 1px solid #f3f3f3;
				}
			}
		}
	}
`;
