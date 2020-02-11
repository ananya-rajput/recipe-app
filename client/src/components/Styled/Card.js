import styled from 'styled-components';

export const StyledCardList = styled.ul`
	width: 780px;
	display: grid;
	grid-gap: 24px;
	margin: 0 auto;
	grid-template-columns: 1fr 1fr;
	@media (max-width: 780px) {
		width: 100%;
	}
	@media (max-width: 567px) {
		grid-template-columns: 1fr;
	}
`;

export const StyledCard = styled.li`
	height: 180px;
	list-style: none;
	border: 1px solid #d8d8d8;
	padding: 40px 20px 20px 20px;

	&:hover {
		background-color: #f4f4f4;
	}

	h2 {
		color: #555b6e;
		padding: 16px 0;
		font-size: 24px;
		font-weight: 500;
	}
	p {
		color: #555b6e;
		font-size: 14px;
		font-weight: 500;
		line-height: 16px;
		margin-bottom: 16px;
	}
	span[data-type='status'] {
		color: #555b6e;
		font-size: 14px;
		line-height: 16px;
		font-style: italic;
		font-weight: normal;
	}
	span[data-type='link'] {
		float: right;
		cursor: pointer;
		color: #00a7e1;
		font-size: 14px;
		font-weight: 500;
		line-height: 16px;

		&:hover {
			text-decoration: underline;
		}
	}
`;
