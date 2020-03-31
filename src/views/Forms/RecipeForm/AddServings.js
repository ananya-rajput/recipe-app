import React from 'react'

import { Text, Input, ButtonTile, HelperText, IconButton } from '@dailykit/ui'

import { TunnelContainer, ServingsInput } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'
import CloseIcon from '../../../assets/icons/Close'

export default function AddServings({ close, next }) {
   // TODO: query for servings for this recipe and fill in below, if query === [] then fill the default value as below.
   const [servings, setServings] = React.useState([{ id: 1, value: 0 }])

   const addServingsHandler = () => {
      if (servings[servings.length - 1].value <= 0) return

      const id = servings[servings.length - 1].id + 1
      const newServings = [...servings]
      newServings.push({ id, value: 0 })
      setServings(newServings)
   }

   const changeServingsHandler = (serving, e) => {
      const servingId = serving.id
      const match = servings.find(serving => serving.id === servingId)
      const index = servings.findIndex(serving => serving.id === servingId)
      match.value = e.target.value
      const updatedServings = [...servings]
      updatedServings[index] = match
      setServings(updatedServings)
   }

   const removeServingHandler = currServing => {
      const servingIndexToRemove = servings.findIndex(
         serving =>
            serving.id === currServing.id && serving.value === currServing.value
      )

      const newServings = [...servings]
      newServings.splice(servingIndexToRemove, 1)

      if (newServings.length === 0) newServings.push({ id: 1, value: 0 })

      setServings(newServings)
   }

   return (
      <TunnelContainer>
         <TunnelHeader
            title='Add Servings'
            close={() => {
               // if closes then do not fire mutation to save servings
               if (servings[servings.length - 1].value === 0) {
                  const newServings = [...servings]
                  newServings.pop()
                  setServings(newServings)
               }
               close(1)
            }}
            next={() => {
               if (servings[servings.length - 1].value === 0) {
                  const newServings = [...servings]
                  newServings.pop()
                  setServings(newServings)
               }

               // fire a mutation to save servings here.
               next(1)
            }}
            nextAction='Add'
         />
         <Spacer />
         <Text as='subtitle'>Enter Servings:</Text>
         <br />
         <ol>
            {servings.map(serving => (
               <React.Fragment key={serving.id}>
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
                              onClick={() => removeServingHandler(serving)}
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
