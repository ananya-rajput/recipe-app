import React, { useContext, useReducer } from 'react'

import { Input, TextButton, RadioGroup, ButtonTile } from '@dailykit/ui/'

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

export default function AddRecipeForm() {
   const [recipeState, recipeDispatch] = useReducer(
      recipeReducers,
      initialRecipeState
   )

   const { dispatch } = useContext(Context)

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

      recipeDispatch({ type: 'RECIPE_NAME_CHANGE', payload: { name } })
   }

   const handleTabNameChange = () => {
      //TODO: add unique code later to the title
      const title = `${recipeState.name}`

      if (title.length > 0) {
         dispatch({
            type: 'SET_RECIPE_TITLE',
            payload: { title, type: 'forms', view: 'recipe' }
         })
      } else {
         dispatch({
            type: 'SET_RECIPE_TITLE',
            payload: { title: 'Untitled Recipe', type: 'forms', view: 'recipe' }
         })
      }
   }

   return (
      <RecipeContext.Provider value={{ recipeState, recipeDispatch }}>
         <ViewWrapper>
            <Menu>
               <div>
                  <Input
                     label='Untitled Recipe'
                     type='text'
                     name='recipeName'
                     value={recipeState.name}
                     onChange={handleRecipeNameChange}
                     onBlur={handleTabNameChange}
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
