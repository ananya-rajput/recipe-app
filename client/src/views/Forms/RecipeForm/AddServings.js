import React, { useContext } from 'react'

import { Context as RecipeContext } from '../../../store/recipe/index'

import { Text, Input, ButtonTile } from '@dailykit/ui'

import { TunnelContainer, ServingsInput } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'

export default function AddServings({ close, next }) {
   const { recipeState, recipeDispatch } = useContext(RecipeContext)

   const addServingsHandler = () => {
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
            close={() => close(1)}
            next={() => next(2)}
         />
         <Spacer />
         <Text as='subtitle'>Enter Servings:</Text>
         <br />
         {recipeState.servings.map(serving => (
            <ServingsInput key={serving.id}>
               <div>{serving.id}.</div>
               <Input
                  onChange={changeServingsHandler}
                  type='text'
                  label='enter'
                  name={serving.id}
                  value={serving.value || ''}
               />
            </ServingsInput>
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
