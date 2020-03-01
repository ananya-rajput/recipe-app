import React from 'react'
import {
   TextButton,
   List,
   ListSearch,
   ListOptions,
   ListItem,
   useMultiList,
   TagGroup,
   Tag
} from '@dailykit/ui'

export default function SelectIngredients({ close, next }) {
   const [search, setSearch] = React.useState('')
   const [list, selected, selectOption] = useMultiList([
      { id: 1, title: 'Potato' },
      { id: 2, title: 'Tomato' },
      { id: 3, title: 'Ginger' },
      { id: 4, title: 'Onion' }
   ])
   return (
      <div style={{ padding: '30px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <TextButton onClick={() => close(2)} type='ghost'>
                  X
               </TextButton>
               <h1>Add Ingredients</h1>
            </div>
            <div>
               <TextButton type='solid' onClick={() => next(3)}>
                  Next
               </TextButton>
            </div>
         </div>
         <br />
         <hr style={{ border: '1px solid #E4E4E4' }} />
         <br />
         <div>
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
                     .filter(option =>
                        option.title.toLowerCase().includes(search)
                     )
                     .map(option => (
                        <ListItem
                           type='MSL1'
                           key={option.id}
                           title={option.title}
                           onClick={() => selectOption('id', option.id)}
                           isActive={selected.find(
                              item => item.id === option.id
                           )}
                        />
                     ))}
               </ListOptions>
            </List>
         </div>
      </div>
   )
}
