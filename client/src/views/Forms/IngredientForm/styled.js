import styled from 'styled-components'

export const Container = styled.div`
    max-width: 1280px;
    margin: 0 auto;
`

export const StyledHeader = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const InputWrapper = styled.div`
    max-width: 256px;
`

export const ActionsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

export const StyledMain = styled.div`
    position: relative;
    height: 100%;
    background: #F3F3F3;
    overflow: scroll;
`

export const StyledTop = styled.div`
    display: grid;
    grid-template-columns: 20% 80%;
    grid-gap: 40px;
    height: 192px;
    align-items: center;
`

export const StyledStatsContainer = styled.div`
    height: 128px;
    display: flex;
    align-items: flex-end;
`
export const StyledStat = styled.div`
    padding-right: 40px;
    margin-right: 12px;
    color: #555B6E;
    font-weight: 500;

    &:not(:last-child) {
        border-right: 1px solid #DDDDDD;
    }
    
    h2 {
        font-size: 20px;
        line-height: 23px;
    }

    p {
        font-size: 14px;
        line-height: 16px;
    }
`

export const PhotoTileWrapper = styled.div`
    width: 464px;
`

export const StyledSection = styled.div`
    display: grid;
    grid-template-columns: 20% 80%;
    grid-gap: ${ props => props.spacing === 'md' ? '28px' : '40px' };
`

export const StyledListing = styled.div`
    display: grid;
    grid-auto-flow: rows;
    grid-gap: 16px;
`

export const StyledDisplay = styled.div`
    background: #fff;
    padding: ${ props => props.contains === 'sachets' ? '0px' : '32px 28px' };
    margin-top: ${ props => props.contains === 'sachets' ? '32px' : '0' };
`

export const StyledListingHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #888D9D;
    }

    svg {
        cursor: pointer;
    }
`

export const StyledListingTile = styled.div`
    background:  ${ props => props.active ? '#555B6E' : '#fff' };
    color: ${ props => props.active ? '#fff' : '#555B6E' };
    padding: 20px 12px;
    cursor: pointer;

    h3 {
        margin-bottom: 20px;
        font-weight: 500;
        font-size: 16px;
        line-height: 14px;
    }

    p {
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        opacity: 0.7;
        &:not(:last-child) {
            margin-bottom: 8px;
        }
    }
`