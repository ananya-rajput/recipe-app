import { IconButton, Text, Input, ButtonTile } from '@dailykit/ui'
import React, { useContext } from 'react'

import AddIcon from '../../../assets/icons/Add'
import { Context as RecipeContext } from '../../../store/recipe/index'
import { IngredientsSection, Stats, DeleteButton } from './styled'
import DeleteIcon from '../../../assets/icons/Delete'

export default function CookingSteps({ open }) {
   const { recipeState, recipeDispatch } = useContext(RecipeContext)
   return (
      <>
         <IngredientsSection>
            <Stats>
               <Text as='subtitle'>Cooking Process</Text>
               <IconButton
                  type='ghost'
                  onClick={() => {
                     recipeDispatch({ type: 'CREATE_COOKING_PROCESS' })
                  }}
               >
                  <AddIcon />
               </IconButton>
            </Stats>

            {recipeState.steps.map((step, index) => (
               <div style={{ marginTop: '10px' }} key={index}>
                  <Stats>
                     <Text as='subtitle'>
                        <strong>Step {index + 1}</strong>
                     </Text>
                     {!index || (
                        <DeleteButton
                           onClick={() => {
                              recipeDispatch({
                                 type: 'DELETE_COOKING_PROCESS',
                                 payload: { index }
                              })
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
                        recipeDispatch({
                           type: 'EDIT_COOOKING_PROCESS',
                           payload: {
                              index,
                              name: e.target.name,
                              value: e.target.value
                           }
                        })
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
                        recipeDispatch({
                           type: 'EDIT_COOOKING_PROCESS',
                           payload: {
                              index,
                              name: e.target.name,
                              value: e.target.value
                           }
                        })
                     }}
                  />
                  <ButtonTile
                     type='primary'
                     size='sm'
                     text='Select Photos for this Step'
                     helper='upto 1mb | only JPGs and PNGs are allowed.'
                     onClick={e => console.log('Tile clicked')}
                     style={{ margin: '20px 0' }}
                  />
               </div>
            ))}
         </IngredientsSection>
      </>
   )
}

{
   /* <div style={{ marginTop: '20px' }}>
               <Text as='subtitle'>
                  <strong>Step {1}</strong>
               </Text>
               <Input
                  type='text'
                  label='Title'
                  name='title'
                  placeholder='Title...'
                  value='sjfdhk'
               />
               <Input
                  type='textarea'
                  label='Description'
                  name='description'
                  rows='5'
                  value='jsank'
               />
               <ButtonTile
                  type='primary'
                  size='sm'
                  text='Select Photos for this Step'
                  helper='upto 1mb | only JPGs and PNGs are allowed.'
                  onClick={e => console.log('Tile clicked')}
                  style={{ margin: '20px 0' }}
               />
            </div> */
}
