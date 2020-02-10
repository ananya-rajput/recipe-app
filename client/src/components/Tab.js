import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { tabClose, tabSwitch } from '../state/actions';

import { FaTimes } from 'react-icons/fa';

const Tab = ({ data, active }) => {
	const dispatch = useDispatch();

	return (
		<Style
			active={active}
			onClick={() => dispatch(tabSwitch({ currentTab: data }))}
		>
			{data.title}
			<FaTimes
				onClick={e => {
					e.stopPropagation();
					dispatch(tabClose());
				}}
			/>
		</Style>
	);
};

export default Tab;

const Style = styled.span(
	({ active }) => `
        background: ${active ? '#fff' : 'rgba(255, 255, 255, 0.5);'};
        padding: 15px;
        color: #555B6E;
        font-weight: 500;
        
        i {
            margin-left: 28px;
            display: ${active ? 'inline' : 'none'};

            &:hover {
                cursor: pointer;
            }
        }

        &:hover {
            cursor: pointer;
        }
    `
);
