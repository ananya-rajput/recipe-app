import { IconButton, Text, Input, ButtonTile } from '@dailykit/ui'
import React from 'react'

import AddIcon from '../../../assets/icons/Add'
import { IngredientsSection, Stats, DeleteButton } from './styled'
import DeleteIcon from '../../../assets/icons/Delete'

export default function CookingSteps() {
   const [cookingSteps, setCookingSteps] = React.useState([
      {
         title: '',
         description: '',
         photos: [{ caption: '', imageUrl: '' }]
      }
   ])

   const createCookingSteps = () => {
      const newStepsForCreating = [...cookingSteps]
      newStepsForCreating.push({
         title: '',
         description: '',
         photos: [{ caption: '', imageUrl: '' }]
      })
      setCookingSteps(newStepsForCreating)
   }

   const deleteCookingStepHandler = index => {
      const newStepsForDeleting = [...cookingSteps]
      newStepsForDeleting.splice(index, 1)
      setCookingSteps(newStepsForDeleting)
   }

   const editCookingStepHandler = (index, name, value) => {
      const newStepsForEditing = [...cookingSteps]
      newStepsForEditing[index][name] = value
      setCookingSteps(newStepsForEditing)
   }

   return (
      <>
         <IngredientsSection>
            <Stats>
               <Text as='subtitle'>Cooking Process</Text>
               <IconButton type='ghost' onClick={createCookingSteps}>
                  <AddIcon />
               </IconButton>
            </Stats>

            {cookingSteps.map((step, index) => (
               <div style={{ marginTop: '10px' }} key={index}>
                  <Stats>
                     <Text as='subtitle'>
                        <strong>Step {index + 1}</strong>
                     </Text>
                     {!index || (
                        <DeleteButton
                           onClick={() => {
                              deleteCookingStepHandler(index)
                           }}
                        >
                           <DeleteIcon color='rgb(255,90,82)' />
                        </DeleteButton>
                     )}
                  </Stats>
                  <hr style={{ border: '1px solid #E4E4E4' }} />
                  <br />
                  <Input
                     type='text'
                     label='Title'
                     name='title'
                     value={step.title}
                     onChange={e => {
                        editCookingStepHandler(
                           index,
                           e.target.name,
                           e.target.value
                        )
                     }}
                  />
                  <br />
                  <Input
                     type='textarea'
                     label='Description'
                     name='description'
                     rows='3'
                     value={step.description}
                     onChange={e => {
                        editCookingStepHandler(
                           index,
                           e.target.name,
                           e.target.value
                        )
                     }}
                  />
                  <ButtonTile
                     type='primary'
                     size='sm'
                     text='Select Photos for this Step'
                     helper='upto 1mb | only JPGs and PNGs are allowed.'
                     onClick={() => {
                        console.log('Tile clicked')
                     }}
                     style={{ margin: '20px 0' }}
                  />
               </div>
            ))}
         </IngredientsSection>
      </>
   )
}
