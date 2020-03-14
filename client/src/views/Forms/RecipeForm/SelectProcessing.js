import React, { useState, useContext } from 'react'

import {
   List,
   ListSearch,
   ListOptions,
   ListItem,
   useSingleList
} from '@dailykit/ui'

import { Context as RecipeContext } from '../../../store/recipe/index'

import { TunnelContainer } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'

export default function SelectProcessing({ next }) {
   const { recipeState, recipeDispatch } = useContext(RecipeContext)
   const [search, setSearch] = useState('')
   const [list, current, selectOption] = useSingleList([
      { id: 1, title: 'Sliced' },
      { id: 2, title: 'Washed' }
   ])

   return (
      <TunnelContainer>
         <TunnelHeader
            title='Add Ingredients'
            close={() => next(4)}
            next={() => {
               recipeDispatch({
                  type: 'ADD_PROCESSING',
                  payload: { processing: current, ingredient: recipeState.view }
               })

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
