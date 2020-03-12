import React, { useContext } from 'react'

import { Text, ButtonTile, TextButton } from '@dailykit/ui'

import { Context as RecipeContext } from '../../../store/recipe/index'

import { TunnelContainer, Content, FlexWidth, ManageIngredient } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'

export default function AddSachets({ close }) {
   const { recipeState, recipeDispatch } = useContext(RecipeContext)

   return (
      <TunnelContainer>
         <TunnelHeader
            title='Add Ingredients'
            close={() => {
               close(3)
               recipeDispatch({
                  type: 'SET_VIEW',
                  payload: {}
               })
            }}
            next={() => {
               close(3)
               close(2)
               close(1)
               recipeDispatch({
                  type: 'SET_VIEW',
                  payload: {}
               })
            }}
         />

         <Spacer />
         <Content>
            <FlexWidth width='1'>
               {/* TODO: add buttons for adding more ingredients when doing functionality part */}
               <Text as='subtitle'>
                  Ingredients ({recipeState.ingredients.length})
               </Text>

               {recipeState.ingredients.map(ingredient => (
                  <div key={ingredient.id}>
                     <TextButton
                        type='solid'
                        onClick={() => {
                           recipeDispatch({
                              type: 'SET_VIEW',
                              payload: ingredient
                           })
                        }}
                     >
                        {ingredient.title}
                     </TextButton>
                  </div>
               ))}
            </FlexWidth>
            <FlexWidth width='3'>
               {/* TODO: add preference for sachets and processing for the ingredient */}
               <ManageIngredient>
                  {recipeState.view.title ? (
                     <>
                        <Content>
                           <FlexWidth width='1'>
                              <Text as='h2'>{recipeState.view.title}</Text>
                           </FlexWidth>
                           <FlexWidth width='3'>
                              <ButtonTile
                                 type='secondary'
                                 text='Select Processing'
                              />
                           </FlexWidth>
                        </Content>
                        <Content>
                           <FlexWidth width='1'>
                              <Text as='subtitle'>For serving</Text>
                              {/* TODO: functionality: add serving */}
                           </FlexWidth>
                        </Content>
                        <br />
                        {recipeState.servings[0].value > 0 &&
                           recipeState.servings.map(serving => (
                              <React.Fragment key={serving.id}>
                                 <Content>
                                    <FlexWidth width='1'>
                                       <Text
                                          as='h2'
                                          style={{ textAlign: 'center' }}
                                       >
                                          {serving.value} People.
                                       </Text>
                                    </FlexWidth>
                                    <FlexWidth width='3'>
                                       <ButtonTile
                                          type='secondary'
                                          text='Add Sachet'
                                       />
                                    </FlexWidth>
                                 </Content>
                                 <br />
                              </React.Fragment>
                           ))}
                        {recipeState.servings[0].value <= 0 && (
                           <Content>
                              <Text as='h2'>No servings available</Text>
                           </Content>
                        )}
                     </>
                  ) : (
                     <Content>
                        <Text as='h2'>Select and ingredient</Text>
                     </Content>
                  )}
               </ManageIngredient>
            </FlexWidth>
         </Content>
      </TunnelContainer>
   )
}
