import React from 'react'
import { useQuery } from '@apollo/react-hooks'
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

const IngredientsListing = () => {
   const { dispatch } = React.useContext(Context)
   const { loading, error, data } = useQuery(GET_INGREDIENTS);
   const addTab = (title, view) => {
      dispatch({ type: 'ADD_TAB', payload: { type: 'forms', title, view } })
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
                  onClick={() => addTab('Untitled Ingredient', 'ingredient')}
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