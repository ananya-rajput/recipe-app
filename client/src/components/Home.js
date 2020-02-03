import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { PageHeading } from './';
import { newTab } from '../state/actions';

const Home = () => {
	const dispatch = useDispatch();

	return (
		<Style>
			<div className="header">
				<PageHeading text="Recipe App" />
			</div>
			<div className="content">
				<div className="card">
					<div className="card-text">
						<h2> Recipes </h2>
						<p> 29 created so far </p>
						<i> All available </i>
					</div>
					<div className="card-link">
						<span
							onClick={() =>
								dispatch(newTab({ type: 'list', title: 'Ingredients' }))
							}
						>
							{' '}
							Go To Recipes &gt;{' '}
						</span>
					</div>
				</div>
				<div className="card">
					<div className="card-text">
						<h2> Stations </h2>
						<p> 4 created so far </p>
						<i> All active </i>
					</div>
					<div className="card-link">
						<span
							onClick={() =>
								dispatch(newTab({ type: 'list', title: 'Stations' }))
							}
						>
							{' '}
							Go To Stations &gt;{' '}
						</span>
					</div>
				</div>
			</div>
		</Style>
	);
};

export default Home;

const Style = styled.div`
	.header {
		display: flex;
		justify-content: space-between;
	}

	.content {
		display: flex;
		justify-content: center;
		margin-top: 40px;

		.card {
			display: flex;
			align-items: flex-end;
			min-width: 380px;
			border: 1px solid #d8d8d8;
			padding: 24px;
			padding-top: 60px;
			color: #555b6e;
			background: #fff;

			&:not(:last-child) {
				margin-right: 100px;
			}

			.card-text {
				flex: 1;

				h2 {
					margin-bottom: 1rem;
				}

				p {
					font-weight: 500;
					margin-bottom: 1rem;
				}
			}

			.card-link {
				flex: 1;
				text-align: right;

				span {
					color: #00a7e1;
					font-weight: 500;

					&:hover {
						cursor: pointer;
					}
				}
			}

			&:hover {
				background: rgba(50, 50, 50, 0.1);
			}
		}
	}
`;
