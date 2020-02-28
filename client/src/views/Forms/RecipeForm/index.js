import React, { useState } from 'react'

import {
   List,
   ListSearch,
   ListOptions,
   ListItem,
   Tag,
   TagGroup,
   useMultiList,
   Tunnels,
   Tunnel,
   useTunnel,
   Text,
   Input,
   TextButton,
   RadioGroup,
   ButtonTile
} from '@dailykit/ui/'
import { ViewWrapper } from '../../../components/Styled/ViewWrapper'
import Menu from '../../../components/Menu'

export default function AddRecipe() {
   const [recipeName, setrecipeName] = useState('')
   const options = [
      { id: 1, title: 'Vegetarian' },
      { id: 2, title: 'Non-Vegetarian' },
      { id: 3, title: 'Vegan' }
   ]

   return (
      <ViewWrapper>
         <Menu>
            <div>
               <Input
                  label='Untitled Recipe'
                  type='text'
                  name='recipeName'
                  value={recipeName}
                  onChange={e => {
                     setrecipeName(e.target.value)
                  }}
               />
            </div>

            <div style={{ width: '100%', textAlign: 'right' }}>
               <TextButton type='ghost' style={{ margin: '0px 10px' }}>
                  open in editor
               </TextButton>

               <TextButton type='ghost' style={{ margin: '0px 10px' }}>
                  save and exit
               </TextButton>

               <TextButton type='solid' style={{ margin: '0px 10px' }}>
                  Publish
               </TextButton>
            </div>
         </Menu>

         <div
            style={{ width: '100%', height: '96px', background: '#F3F3F3' }}
         ></div>

         <div
            style={{
               marginTop: '24px',
               width: '100%',
               display: 'flex',
               justifyContent: 'center'
            }}
         >
            <RadioGroup
               options={options}
               active={2}
               onChange={option => console.log(option)}
            />
         </div>

         <div
            style={{
               margin: '24px auto',
               width: '50%'
            }}
         >
            <ButtonTile
               type='primary'
               size='lg'
               text='Add photos to your recipe'
               helper='upto 1MB &#8226; only JPGs, PNGs, and PDFs are allowed.'
            />

            <Ingredients />
         </div>
      </ViewWrapper>
   )
}

function Ingredients() {
   const [tunnels, openTunnel, closeTunnel] = useTunnel(3)
   return (
      <>
         <Tunnels tunnels={tunnels}>
            <Tunnel layer={1}>
               <AddServings close={closeTunnel} next={openTunnel} />
            </Tunnel>
            <Tunnel layer={2}>
               <AddIngredients close={closeTunnel} next={openTunnel} />
            </Tunnel>
            <Tunnel layer={3} size='lg'>
               <AddSachets close={closeTunnel} />
            </Tunnel>
         </Tunnels>
         <div style={{ width: '100%', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <div>
                  <h4
                     style={{
                        fontSize: 16,
                        color: '#888D9D'
                     }}
                  >
                     Ingredients (0)
                  </h4>
               </div>
            </div>
            <ButtonTile
               as='button'
               type='secondary'
               text='Add Ingredient'
               onClick={() => openTunnel(1)}
            />
         </div>
      </>
   )
}

function AddServings({ close, next }) {
   return (
      <div style={{ padding: '30px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <TextButton onClick={() => close(1)} type='ghost'>
                  X
               </TextButton>
               <h1>Add Servings</h1>
            </div>
            <div>
               <TextButton type='solid' onClick={() => next(2)}>
                  Next
               </TextButton>
            </div>
         </div>
         <br />
         <hr style={{ border: '1px solid #E4E4E4' }} />
         <br />
         <div>
            <Text as='subtitle'>Enter Servings:</Text>
            <br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <div style={{ marginRight: '5px' }}>1.</div>
               <Input type='text' label='enter' name='serving1' value='' />
            </div>
            <br />
            <ButtonTile
               as='button'
               type='secondary'
               text='Add more servings'
               onClick={() => {}}
            />
         </div>
      </div>
   )
}

function AddIngredients({ close, next }) {
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

function AddSachets({ close }) {
   return (
      <div style={{ padding: '30px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <TextButton onClick={() => close(3)} type='ghost'>
                  X
               </TextButton>
               <h1>Add Ingredients</h1>
            </div>
            <div>
               <TextButton type='solid' onClick={() => {}}>
                  Next
               </TextButton>
            </div>
         </div>
         <br />
         <hr style={{ border: '1px solid #E4E4E4' }} />
         <br />
         {/* <div>TODO: start from here tomorrow</div> */}
      </div>
   )
}
