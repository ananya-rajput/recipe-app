import React, { useState } from 'react'

import {
   List,
   ListSearch,
   ListOptions,
   ListItem,
   useMultiList,
   TagGroup,
   Tag
} from '@dailykit/ui'

import { TunnelContainer } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'

export default function SelectIngredients({ close, next }) {
   const [ingredients, setIngredients] = React.useState([])
   const [search, setSearch] = useState('')

   // fetch ingredients and put it inside useMultiList
   const [list, selected, selectOption] = useMultiList([
      { id: 1, title: 'Potato' },
      { id: 2, title: 'Tomato' },
      { id: 3, title: 'Ginger' },
      { id: 4, title: 'Onion' }
   ])

   return (
      <TunnelContainer>
         <TunnelHeader
            title='Add Ingredients'
            close={() => close(2)}
            next={() => {
               // TODO: fire a mutation to update ingredients for this recipe.
               setIngredients(selected)
               next(2)
            }}
            nextAction='Done'
         />
         <Spacer />

         <List>
            <ListSearch
               onChange={value => setSearch(value)}
               placeholder='type what you’re looking for...'
            />
            {selected.length > 0 && (
               <TagGroup style={{ margin: '8px 0' }}>
                  {selected.map(option => (
                     <Tag
                        key={option.id}
                        title={option.title}
                        onClick={() => selectOption('id', option.id)}
                     >
                        {option.title}
                     </Tag>
                  ))}
               </TagGroup>
            )}
            <ListOptions>
               {list
                  .filter(option => option.title.toLowerCase().includes(search))
                  .map(option => (
                     <ListItem
                        type='MSL1'
                        key={option.id}
                        title={option.title}
                        onClick={() => {
                           selectOption('id', option.id)
                        }}
                        isActive={selected.find(item => item.id === option.id)}
                     />
                  ))}
            </ListOptions>
         </List>
      </TunnelContainer>
   )
}
