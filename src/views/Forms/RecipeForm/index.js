import React, { useContext, useReducer } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {
   Input,
   TextButton,
   RadioGroup,
   ButtonTile,
   useMultiList
} from '@dailykit/ui/'

import { Context } from '../../../store/tabs/index'
import {
   Context as RecipeContext,
   state as initialRecipeState,
   reducers as recipeReducers
} from '../../../store/recipe/index'

import { ViewWrapper } from '../../../components/Styled/ViewWrapper'
import { RecipeActions, RecipeType, Container } from './styled'

import AddIngredients from './AddIngredients'
import Menu from '../../../components/Menu'

import { RECIPE, UPDATE_RECIPE } from '../../../graphql'

export default function AddRecipeForm() {
   const [recipeState, recipeDispatch] = useReducer(
      recipeReducers,
      initialRecipeState
   )
   const { state, dispatch } = useContext(Context)

   // State
   const [recipe, setRecipe] = React.useState({
      id: '',
      name: ''
   })

   // Queries and Mutations
   const {} = useQuery(RECIPE, {
      variables: { ID: state.current.ID },
      onCompleted: data => {
         setRecipe(data.recipe)
      }
   })
   const [updateRecipe] = useMutation(UPDATE_RECIPE, {
      onCompleted: data => {
         if (data.updateRecipe.success) {
            setRecipe({ ...recipe, name: data.updateRecipe.recipe.name })
            if (state.current.title !== data.updateRecipe.recipe.name) {
               dispatch({
                  type: 'SET_TITLE',
                  payload: {
                     title: data.updateRecipe.recipe.name,
                     oldTitle: state.current.title
                  }
               })
            }
         } else {
            // Fire toast
            console.log(data)
         }
      }
   })

   // Handlers
   const updateRecipeHandler = () => {
      updateRecipe({
         variables: {
            recipeId: recipe.id,
            name: recipe.name
         }
      })
   }

   const recipeTypeOptions = [
      { id: 1, title: 'Vegetarian' },
      { id: 2, title: 'Non-Vegetarian' },
      { id: 3, title: 'Vegan' }
   ]

   const handlePublish = () => {
      console.log('%c values', 'color: #28c1f7', {
         recipeState
      })
   }

   const handleRecipeNameChange = e => {
      const name = e.target.value
      // recipeDispatch({ type: 'RECIPE_NAME_CHANGE', payload: { name } })
   }

   const handleTabNameChange = () => {
      //TODO: add utils/generateRandomString() later to the title
      const title = `${recipeState.name}`

      if (title.length > 0) {
         dispatch({
            type: 'SET_TITLE',
            payload: { title, oldTitle: state.current.title }
         })
      } else {
         dispatch({
            type: 'SET_TITLE',
            payload: { title: 'Untitled Recipe', oldTitle: state.current.title }
         })
      }
   }

   return (
      <RecipeContext.Provider value={{ recipeState, recipeDispatch }}>
         <ViewWrapper>
            <Menu>
               <div>
                  <Input
                     label='Recipe Name'
                     type='text'
                     name='recipeName'
                     value={recipe.name}
                     onChange={e =>
                        setRecipe({ ...recipe, name: e.target.value })
                     }
                     onBlur={updateRecipeHandler}
                  />
               </div>

               <RecipeActions>
                  <TextButton type='ghost' style={{ margin: '0px 10px' }}>
                     open in editor
                  </TextButton>

                  <TextButton type='ghost' style={{ margin: '0px 10px' }}>
                     save and exit
                  </TextButton>

                  <TextButton
                     onClick={handlePublish}
                     type='solid'
                     style={{ margin: '0px 10px' }}
                  >
                     Publish
                  </TextButton>
               </RecipeActions>
            </Menu>

            {/* TODO: add stats here */}

            <RecipeType>
               <RadioGroup
                  options={recipeTypeOptions}
                  active={recipeState.recipeType.id}
                  onChange={type =>
                     recipeDispatch({
                        type: 'CHANGE_RECIPE_STATE',
                        payload: type
                     })
                  }
               />
            </RecipeType>

            <Container>
               <ButtonTile
                  onClick={() => {}}
                  type='primary'
                  size='lg'
                  text='Add photos to your recipe'
                  helper='upto 1MB &#8226; only JPGs, PNGs, and PDFs are allowed.'
               />
               <AddIngredients />
            </Container>
         </ViewWrapper>
      </RecipeContext.Provider>
   )
}
