import React, { useState, useContext } from 'react'
import { Input, TextButton, RadioGroup, ButtonTile } from '@dailykit/ui/'

import { Context } from '../../../store/tabs/index'

import AddIngredients from './AddIngredients'
import { ViewWrapper } from '../../../components/Styled/ViewWrapper'
import Menu from '../../../components/Menu'

export default function AddRecipeForm() {
   const [recipeName, setrecipeName] = useState('')
   const { dispatch } = useContext(Context)

   const options = [
      { id: 1, title: 'Vegetarian' },
      { id: 2, title: 'Non-Vegetarian' },
      { id: 3, title: 'Vegan' }
   ]

   const handleRecipeNameChange = e => {
      const title = e.target.value
      dispatch({
         type: 'SET_RECIPE_TITLE',
         payload: { title, type: 'forms', view: 'recipe' }
      })
      setrecipeName(title)
   }

   return (
      <ViewWrapper>
         <Menu>
            <div>
               <Input
                  label='Untitled Recipe'
                  type='text'
                  name='recipeName'
                  value={recipeName}
                  onChange={handleRecipeNameChange}
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

            <AddIngredients />
         </div>
      </ViewWrapper>
   )
}
