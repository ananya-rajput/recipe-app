import React, { useState } from 'react'

import {
   List,
   ListSearch,
   ListOptions,
   ListItem,
   useSingleList
} from '@dailykit/ui'

import { TunnelContainer } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'

export default function SelectProcessing({ next }) {
   const [search, setSearch] = useState('')
   // fill below list with availbale processings
   const [list, current, selectOption] = useSingleList([
      { id: 1, title: 'Sliced' },
      { id: 2, title: 'Washed' }
   ])

   const addProcessingHandler = () => {
      // fire mutation here to update the processing for the given ingredient.
      // 'current' is the selected processing
      // recipeState.view -> ingredient for which we want to update the processing
   }

   return (
      <TunnelContainer>
         <TunnelHeader
            title='Add Ingredients'
            close={() => next(4)}
            next={() => {
               addProcessingHandler()
               next(4)
            }}
         />
         <Spacer />

         <List>
            {Object.keys(current).length > 0 ? (
               <ListItem type='SSL1' title={current.title} />
            ) : (
               <ListSearch
                  onChange={value => setSearch(value)}
                  placeholder='type what you’re looking for...'
               />
            )}
            <ListOptions>
               {list
                  .filter(option => option.title.toLowerCase().includes(search))
                  .map(option => (
                     <ListItem
                        type='SSL1'
                        key={option.id}
                        title={option.title}
                        isActive={option.id === current.id}
                        onClick={() => selectOption('id', option.id)}
                     />
                  ))}
            </ListOptions>
         </List>
      </TunnelContainer>
   )
}
