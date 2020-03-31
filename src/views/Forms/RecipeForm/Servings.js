import React from 'react'

import { Text, TagGroup, Tag, ButtonTile, IconButton } from '@dailykit/ui'

import { IngredientsSection, Stats, CustomCrossButton } from './styled'
import AddIcon from '../../../assets/icons/Add'
import UserIcon from '../../../assets/icons/User'

export default function Servings({ open }) {
   const [servings, setServings] = React.useState([{ id: 1, value: 0 }])

   const ServinRemoveHandler = serving => {
      // fire mutation to delete this serving
   }

   return (
      <>
         <IngredientsSection>
            <Stats>
               <Text as='subtitle'>
                  Servings ({servings[0].value !== 0 ? servings.length : '0'})
               </Text>
               {servings[0].value !== 0 && servings.length > 0 && (
                  <IconButton type='ghost' onClick={() => open(1)}>
                     <AddIcon />
                  </IconButton>
               )}
            </Stats>
            <TagGroup>
               {servings.map(serving =>
                  serving.value !== 0 ? (
                     <Tag key={serving.id}>
                        <UserIcon />
                        <span style={{ marginLeft: '5px' }}>
                           {serving.value}
                        </span>
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
