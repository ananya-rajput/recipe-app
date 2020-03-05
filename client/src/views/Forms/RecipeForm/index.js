import React, { useState, useContext, useRef } from 'react'

import { Input, TextButton, RadioGroup, ButtonTile } from '@dailykit/ui/'

import { Context } from '../../../store/tabs/index'

import { ViewWrapper } from '../../../components/Styled/ViewWrapper'
import { RecipeActions, RecipeType, Container } from './styled'

import AddIngredients from './AddIngredients'
import Menu from '../../../components/Menu'

export default function AddRecipeForm() {
   const [recipeName, setrecipeName] = useState('')
   const [recipeType, setRecipeType] = useState({
      id: 2,
      title: 'Non-Vegetarian'
   })
   const [recipePictures, setRecipePictures] = useState([])

   const imageRef = useRef(null)
   const { dispatch } = useContext(Context)

   const recipeTypeOptions = [
      { id: 1, title: 'Vegetarian' },
      { id: 2, title: 'Non-Vegetarian' },
      { id: 3, title: 'Vegan' }
   ]

   const handlePublish = () => {
      console.log('%c values', 'color: #28c1f7', { recipeName, recipeType })
   }

   const handleRecipeNameChange = e => {
      const title = e.target.value

      setrecipeName(title)
   }

   const handleTabNameChange = title => {
      if (title.length > 0) {
         dispatch({
            type: 'SET_RECIPE_TITLE',
            payload: { title, type: 'forms', view: 'recipe' }
         })
      } else {
         dispatch({
            type: 'SET_RECIPE_TITLE',
            payload: { title: 'Untitled Recipe', type: 'forms', view: 'recipe' }
         })
      }
   }

   const handleRecipePictures = e => {
      const rawPictures = imageRef.current.files
      const pictureArrays = []

      Object.keys(rawPictures).map(key => {
         const url = URL.createObjectURL(rawPictures[key])
         pictureArrays.push({ file: rawPictures[key], url })
      })
      console.log(pictureArrays)
      setRecipePictures(pictureArrays)
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
                  onBlur={() => handleTabNameChange(recipeName)}
               />
            </div>

            <RecipeActions>
               <TextButton type='ghost' style={{ margin: '0px 10px' }}>
                  open in editor
               </TextButton>

               <TextButton type='ghost' style={{ margin: '0px 10px' }}>
                  save and exit
               </TextButton>

               <TextButton
                  onClick={handlePublish}
                  type='solid'
                  style={{ margin: '0px 10px' }}
               >
                  Publish
               </TextButton>
            </RecipeActions>
         </Menu>

         {/* TODO: add stats here */}

         <RecipeType>
            <RadioGroup
               options={recipeTypeOptions}
               active={2}
               onChange={type => setRecipeType(type)}
            />
         </RecipeType>

         <Container>
            {recipePictures.length === 0 ? (
               <ButtonTile
                  onClick={() => imageRef.current.click()}
                  type='primary'
                  size='lg'
                  text='Add photos to your recipe'
                  helper='upto 1MB &#8226; only JPGs, PNGs, and PDFs are allowed.'
               />
            ) : null}

            {recipePictures.map(pic => {
               return (
                  <img
                     width='200'
                     height='200'
                     src={pic.url}
                     style={{ margin: '5px' }}
                  />
               )
            })}

            <input
               type='file'
               accept='image/png, image/jpeg'
               hidden
               ref={imageRef}
               multiple
               onChange={handleRecipePictures}
            />

            <AddIngredients />
         </Container>
      </ViewWrapper>
   )
}
