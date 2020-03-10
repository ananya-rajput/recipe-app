import React, { useState } from 'react'

import { Text, Input, ButtonTile } from '@dailykit/ui'

import { TunnelContainer, ServingsInput } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'

export default function AddServings({ close, next }) {
   const [servings, setservings] = useState([{ id: 1, value: 0 }])

   const addServingsHandler = () => {
      const id = servings[servings.length - 1].id + 1
      setservings([...servings, { id, value: 0 }])
   }

   const changeServingsHandler = e => {
      const index = e.target.name - 1
      const match = servings[index]
      match.value = e.target.value

      const updatedServings = [...servings]
      updatedServings[index] = match
      setservings(updatedServings)
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
         {servings.map(serving => (
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
