import React, { useContext } from 'react'

import { Context as RecipeContext } from '../../../store/recipe/index'

import { Text, Input, ButtonTile, HelperText } from '@dailykit/ui'

import { TunnelContainer, ServingsInput } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'

export default function AddServings({ close, next }) {
   const { recipeState, recipeDispatch } = useContext(RecipeContext)

   const addServingsHandler = () => {
      if (recipeState.servings[recipeState.servings.length - 1].value <= 0)
         return
      recipeDispatch({ type: 'ADD_SERVING' })
   }

   const changeServingsHandler = e => {
      const index = e.target.name - 1
      recipeDispatch({
         type: 'CHANGE_SERVINGS',
         payload: { index, value: e.target.value }
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
               next(2)
            }}
         />
         <Spacer />
         <Text as='subtitle'>Enter Servings:</Text>
         <br />
         {recipeState.servings.map(serving => (
            <React.Fragment key={serving.id}>
               <ServingsInput>
                  <div>{serving.id}.</div>
                  <Input
                     onChange={changeServingsHandler}
                     type='text'
                     label='enter'
                     name={serving.id}
                     value={serving.value || ''}
                  />
               </ServingsInput>
               {serving.value <= 0 ? (
                  <HelperText
                     type='hint'
                     message='fill this first to continue adding new servings!'
                  />
               ) : null}
            </React.Fragment>
         ))}
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
