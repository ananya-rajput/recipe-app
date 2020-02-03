import React from 'react';
import styled from 'styled-components';

const PageHeading = ({ text, size, stats }) => {
	return (
		<Style size={size}>
			{text}
			{stats && <span> ({stats}) </span>}
		</Style>
	);
};

export default PageHeading;

const Style = styled.h1(
	({ size }) => `
        color: #555B6E;
        font-size: ${size && size + 'px'};
        
        span {
            color: rgba(50, 50, 50, 0.5);
        }
    `
);
