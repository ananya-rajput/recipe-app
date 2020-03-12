import styled from 'styled-components'

export const IngredientsSection = styled.div`
   width: 100%;
   margin-top: 20px;
`
export const IngredientStats = styled.div`
   display: flex;
   justify-content: space-between;
`
export const TunnelContainer = styled.div`
   padding: 30px;
`
export const ServingsInput = styled.div`
   margin: 20px 0;
   display: flex;
   align-items: center;

   div {
      margin-right: 5px;
   }
`
export const Content = styled.div`
   display: flex;
`
export const FlexWidth = styled.div`
   flex: ${({ width }) => width};
`
export const ManageIngredient = styled.div`
   border: 1px solid #ececec;
   margin-top: 18px;
   padding: 20px;
`
export const RecipeActions = styled.div`
   width: 100%;
   text-align: right;
`

export const RecipeType = styled.div`
   margin-top: 24px;
   width: 100%;
   display: flex;
   justify-content: center;
`
export const Container = styled.div`
   margin: 24px auto;
   width: 50%;
`
export const CustomButton = styled.button`
   border: 0;
   outline: 0;
   border-bottom: ${props => (props.active ? '0' : '1px solid #ececec')};
   width: 80%;
   float: left;
   padding: 20px;
   padding-left: 5px;
   text-align: left;
   background-color: ${props => (props.active ? '#555b6e' : '#fff')};
   color: ${props => (props.active ? '#fff' : '#555b6e')};
`
