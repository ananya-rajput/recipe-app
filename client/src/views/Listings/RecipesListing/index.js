import React from 'react'

import {
   IconButton,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody
} from '@dailykit/ui'

// Icons
import { AddIcon } from '../../../assets/icons'

// State
import { Context } from '../../../store/tabs'

// Styled
import {
   StyledWrapper,
   StyledTableHeader,
   StyledTableActions,
   StyledHeader,
   StyledContent
} from '../styled'

const RecipesListing = () => {
   const { state, dispatch } = React.useContext(Context)
   const addTab = (title, view) => {
      dispatch({
         type: 'ADD_TAB',
         payload: { type: 'forms', title, view, index: state.forms.length }
      })
   }

   const recipes = [
      {
         id: 1,
         name: 'Fried Noodles',
         author: 'Siddhant',
         servings: [
            { id: 1, value: 2 },
            { id: 2, value: 4 }
         ],
         ingredientCount: 4
      },
      {
         id: 2,
         name: 'Chicken Tikka',
         author: 'Siddhant Again',
         servings: [{ id: 1, value: 4 }],
         ingredientCount: 6
      },
      {
         id: 3,
         name: 'Fish Fry',
         author: 'Masterchef Siddhant',
         servings: [{ id: 1, value: 2 }],
         ingredientCount: 5
      }
   ]

   return (
      <StyledWrapper>
         <StyledHeader>
            <h1>Recipes</h1>
            <p> pagination </p>
         </StyledHeader>
         <StyledTableHeader>
            <p>filters</p>
            <StyledTableActions>
               <IconButton
                  type='solid'
                  onClick={() => addTab('Untitled Recipe', 'recipe')}
               >
                  <AddIcon color='#fff' size={24} />
               </IconButton>
            </StyledTableActions>
         </StyledTableHeader>
         <StyledContent>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Recipe Name</TableCell>
                     <TableCell>Recipe Author</TableCell>
                     <TableCell>Servings</TableCell>
                     <TableCell>Ingredient Count</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {recipes.map(recipe => (
                     <TableRow key={recipe.id}>
                        <TableCell>{recipe.name}</TableCell>
                        <TableCell>{recipe.author}</TableCell>
                        <TableCell>
                           {recipe.servings.map(serving => (
                              <div key={serving.id}>
                                 {serving.value}
                                 {recipe.servings[recipe.servings.length - 1]
                                    .id !== serving.id && ','}
                              </div>
                           ))}
                        </TableCell>
                        <TableCell>{recipe.ingredientCount}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </StyledContent>
      </StyledWrapper>
   )
}

export default RecipesListing
