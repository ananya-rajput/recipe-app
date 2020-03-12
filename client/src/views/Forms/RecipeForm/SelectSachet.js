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

export default function SelectSachet({ next }) {
   const { recipeDispatch } = useContext(RecipeContext)
   const [search, setSearch] = useState('')
   const [list, current, selectOption] = useSingleList([
      { id: 1, title: '200gm' },
      { id: 2, title: '800gm' }
   ])

   return (
      <TunnelContainer>
         <TunnelHeader
            title='Select Sachet'
            close={() => next(2)}
            next={() => {
               recipeDispatch({
                  type: 'ADD_SACHET',
                  payload: { sachet: current }
               })

               next(2)
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
