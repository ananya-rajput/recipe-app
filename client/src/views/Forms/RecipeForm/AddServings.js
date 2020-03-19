import React, { useContext } from 'react'

import { Context as RecipeContext } from '../../../store/recipe/index'

import { Text, Input, ButtonTile, HelperText, IconButton } from '@dailykit/ui'

import { TunnelContainer, ServingsInput } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'
import CloseIcon from '../../../assets/icons/Close'

export default function AddServings({ close, next }) {
   const { recipeState, recipeDispatch } = useContext(RecipeContext)

   const addServingsHandler = () => {
      if (recipeState.servings[recipeState.servings.length - 1].value <= 0)
         return
      recipeDispatch({ type: 'ADD_SERVING' })
   }

   const changeServingsHandler = (serving, e) => {
      const id = serving.id
      recipeDispatch({
         type: 'CHANGE_SERVINGS',
         payload: { id, value: e.target.value }
      })
   }

   return (
      <TunnelContainer>
         <TunnelHeader
            title='Add Servings'
            close={() => {
               recipeDispatch({ type: 'REFINE_SERVINGS' })
               close(1)
            }}
            next={() => {
               recipeDispatch({ type: 'REFINE_SERVINGS' })
               next(1)
            }}
            nextAction='Add'
         />
         <Spacer />
         <Text as='subtitle'>Enter Servings:</Text>
         <br />
         <ol>
            {recipeState.servings.map(serving => (
               <React.Fragment>
                  <li key={serving.id}>
                     <ServingsInput>
                        <Input
                           onChange={e => changeServingsHandler(serving, e)}
                           type='text'
                           placeholder='enter'
                           name={serving.id}
                           value={serving.value || ''}
                        />
                        {serving.value > 0 && (
                           <IconButton
                              type='outline'
                              onClick={() => {
                                 recipeDispatch({
                                    type: 'REMOVE_SERVING',
                                    payload: serving
                                 })
                              }}
                           >
                              <CloseIcon />
                           </IconButton>
                        )}
                     </ServingsInput>
                  </li>

                  {serving.value <= 0 ? (
                     <HelperText
                        type='hint'
                        message='fill this first to continue adding new servings!'
                     />
                  ) : null}
               </React.Fragment>
            ))}
         </ol>
         <br />
         <ButtonTile
            as='button'
            type='secondary'
            text='Add more servings'
            onClick={addServingsHandler}
         />
      </TunnelContainer>
   )
}
