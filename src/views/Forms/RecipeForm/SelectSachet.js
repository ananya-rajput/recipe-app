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

export default function SelectSachet({ next, serving, ingredient }) {
   const [search, setSearch] = useState('')
   // query for availbale sachets and update the list below.
   const [list, current, selectOption] = useSingleList([
      { id: 1, title: '200gm' },
      { id: 2, title: '800gm' }
   ])

   const addSachetHandler = () => {
      // fire muation for adding sachet for this ingredient at given serving.
      // props.serving is the current serving to which this sachet references.
      // props.ingredient is the current ingredient to which this sachet references.
   }

   return (
      <TunnelContainer>
         <TunnelHeader
            title='Select Sachet'
            close={() => next(5)}
            next={() => {
               addSachetHandler()

               next(5)
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
