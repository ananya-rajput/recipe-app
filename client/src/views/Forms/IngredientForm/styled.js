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
   background: #f3f3f3;
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
   color: #555b6e;
   font-weight: 500;

   &:not(:last-child) {
      border-right: 1px solid #dddddd;
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
export const ImageContainer = styled.div`
   width: 100%;
   height: 100%;

   img {
      width: 100%;
      height: 100%;
      object-fit: auto;
   }
`

export const StyledSection = styled.div`
   display: grid;
   grid-template-columns: 20% 80%;
   grid-gap: ${props => (props.spacing === 'md' ? '28px' : '40px')};
`

export const StyledListing = styled.div`
   display: grid;
   grid-auto-flow: rows;
   grid-gap: 16px;
`

export const StyledDisplay = styled.div`
   background: #fff;
   padding: ${props => (props.contains === 'sachets' ? '0px' : '32px 28px')};
   margin-top: ${props => (props.contains === 'sachets' ? '16px' : '0')};
`

export const StyledListingHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;

   h3 {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #888d9d;
   }

   svg {
      cursor: pointer;
   }
`

export const StyledListingTile = styled.div`
   background: ${props => (props.active ? '#555B6E' : '#fff')};
   color: ${props => (props.active ? '#fff' : '#555B6E')};
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

export const StyledTabsContainer = styled.div`
   display: flex;
   border-bottom: 1px solid rgba(206, 206, 206, 0.3);
`

export const StyledTab = styled.div`
   font-weight: 500;
   font-size: 16px;
   line-height: 14px;
   color: #888d9d;
   cursor: pointer;
   margin-right: 80px;
   padding: 16px 0;

   &.active {
      color: #00a7e1;
      border-bottom: 3px solid #00a7e1;
   }
`

export const StyledTabContent = styled.div`
   display: none;

   &.active {
      display: block;
   }
`

export const StyledTextAndSelect = styled.div`
   display: flex;
   justify-content: flex-start;
   margin-bottom: 48px;

   > div {
      max-width: 180px;
      margin-right: 16px;
   }
`

export const ToggleWrapper = styled.div`
   max-width: 156px;
   margin-bottom: 20px;
`

export const StyledTable = styled.table`
   width: 100%;
   border: 1px solid #e4e4e4;

   thead {
      background: #f3f3f3;

      tr {
         font-size: 12px;
         line-height: 14px;
         color: #888d9d;

         th {
            padding: 8px 0;
            font-weight: normal;
         }
      }
   }

   tbody {
      tr {
         font-weight: 500;
         font-size: 14px;
         line-height: 14px;
         color: #888d9d;

         &:not(:last-child) {
            td {
               border-bottom: 1px solid #e4e4e4;
            }
         }

         td {
            padding: 20px;

            &:first-child {
               display: flex;

               > div {
                  margin-right: 12px;
               }
            }
         }
      }
   }
`
