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
export const RecipePhotos = styled.div`
   margin: 24px auto;
   width: 50%;
`
