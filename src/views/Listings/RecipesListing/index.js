import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
   IconButton,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody
} from '@dailykit/ui'

import { generateRandomString } from '../../../utils'

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

import { CREATE_RECIPE } from '../../../graphql'

const RecipesListing = () => {
   const { state, dispatch } = React.useContext(Context)
   const addTab = (title, view, ID) => {
      dispatch({
         type: 'ADD_TAB',
         payload: { type: 'forms', title, view, ID }
      })
   }

   const [createRecipe] = useMutation(CREATE_RECIPE, {
      onCompleted: data => {
         if (data.createRecipe.success) {
            addTab(
               data.createRecipe.recipe.name,
               'recipe',
               data.createRecipe.recipe.id
            )
         } else {
            // Fire toast
            console.log(data)
         }
      }
   })

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

   const createRecipeHandler = () => {
      let name = 'recipe-' + generateRandomString()
      createRecipe({ variables: { name } })
   }

   return (
      <StyledWrapper>
         <StyledHeader>
            <h1>Recipes</h1>
            <p> pagination </p>
         </StyledHeader>
         <StyledTableHeader>
            <p>filters</p>
            <StyledTableActions>
               <IconButton type='solid' onClick={createRecipeHandler}>
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
