import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import {
   IconButton,
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   Checkbox
} from '@dailykit/ui'

// Icons
import { AddIcon } from '../../../assets/icons'

// State
import { Context } from '../../../store/tabs'

// Styled
import { StyledWrapper, StyledTableHeader, StyledTableActions, StyledHeader, StyledContent } from '../styled'

// Queries
const GET_INGREDIENTS = gql`
   {
      ingredients {
         name
      }
   }
`

const CREATE_INGREDIENT = gql`
   mutation CreateIngredient($ingredient: IngredientInput) {
      createIngredient(input: $ingredient) {
         _id
         name
      }
   }
`

const IngredientsListing = () => {
   const { dispatch } = React.useContext(Context)
   const { loading, error, data } = useQuery(GET_INGREDIENTS);
   const addTab = (title, view) => {
      dispatch({ type: 'ADD_TAB', payload: { type: 'forms', title, view } })
   }
   const [createIngredient] = useMutation(CREATE_INGREDIENT, {
      onCompleted: data => {
         addTab(data.createIngredient.name, 'forms')
      }
   })

   const generateRandomString = () => {
      let result           = '';
      const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < 6; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }

   const createIngredientHandler = async () => {
      let name = 'ingredient-' + generateRandomString();
      createIngredient({ variables: { ingredient: { name } } })
   }

   return (
      <StyledWrapper>
         <StyledHeader>
            <h1>Ingredients</h1>
            <p> pagination </p>
         </StyledHeader>
         <StyledTableHeader>
            <p>filters</p>
            <StyledTableActions>
               <IconButton
                  type="solid"
                  onClick={createIngredientHandler}
               >
                  <AddIcon color="#fff" size={24} />
               </IconButton>
            </StyledTableActions>
         </StyledTableHeader>
         <StyledContent>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell> <Checkbox checked={ false }/> </TableCell>
                     <TableCell> Name </TableCell>
                     <TableCell> Variant </TableCell>
                     <TableCell> Quantity </TableCell>
                     <TableCell> Modes of Fulfillment </TableCell>
                     <TableCell> Stations </TableCell>
                     <TableCell> Supplier Item </TableCell>
                     <TableCell> Availability </TableCell>
                     <TableCell>  </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {
                     !loading && !error &&
                     data.ingredients.map(ingredient => 
                        <TableRow>
                           <TableCell> <Checkbox checked={ false }/> </TableCell>
                           <TableCell> { ingredient.name } </TableCell>
                           <TableCell> { ingredient.name } </TableCell>
                           <TableCell> { ingredient.name } </TableCell>
                           <TableCell> { ingredient.name } </TableCell>
                           <TableCell> { ingredient.name } </TableCell>
                           <TableCell> { ingredient.name } </TableCell>
                           <TableCell> { ingredient.name } </TableCell>
                           <TableCell>

                           </TableCell>
                        </TableRow>
                     )
                  }
               </TableBody>
            </Table>
         </StyledContent>
      </StyledWrapper>
   )
}

export default IngredientsListing