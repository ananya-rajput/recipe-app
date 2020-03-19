import React, { useContext } from 'react'

import { Text, TagGroup, Tag, ButtonTile, IconButton } from '@dailykit/ui'

import { Context as RecipeContext } from '../../../store/recipe/index'

import { IngredientsSection, Stats, CustomCrossButton } from './styled'
import AddIcon from '../../../assets/icons/Add'

export default function Servings({ open }) {
   const { recipeState, recipeDispatch } = useContext(RecipeContext)

   const ServinRemoveHandler = serving => {
      recipeDispatch({ type: 'REMOVE_SERVING', payload: serving })
   }

   return (
      <>
         <IngredientsSection>
            <Stats>
               <Text as='subtitle'>
                  Servings (
                  {recipeState.servings[0].value !== 0
                     ? recipeState.servings.length
                     : '0'}
                  )
               </Text>
               {recipeState.servings[0].value !== 0 &&
                  recipeState.servings.length > 0 && (
                     <IconButton type='ghost' onClick={() => open(1)}>
                        <AddIcon />
                     </IconButton>
                  )}
            </Stats>
            <TagGroup>
               {recipeState.servings.map(serving =>
                  serving.value !== 0 ? (
                     <Tag key={serving.id}>
                        {serving.value}
                        <CustomCrossButton
                           onClick={() => ServinRemoveHandler(serving)}
                        >
                           X
                        </CustomCrossButton>
                     </Tag>
                  ) : (
                     <ButtonTile
                        key={serving.id}
                        as='button'
                        type='secondary'
                        text='Add Serving'
                        onClick={() => open(1)}
                     />
                  )
               )}
            </TagGroup>
         </IngredientsSection>
      </>
   )
}
