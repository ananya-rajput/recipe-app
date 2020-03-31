import React, { useContext, useState } from 'react'

import {
   Tunnels,
   Tunnel,
   useTunnel,
   ButtonTile,
   Text,
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   IconButton
} from '@dailykit/ui'

import { Context as RecipeContext } from '../../../store/recipe/index'

import {
   IngredientsSection,
   Stats,
   IngredientTable,
   SelectButton
} from './styled'

import AddServings from './AddServings'
import SelectIngredients from './SelectIngredients'
import AddSachets from './AddSachets'
import SelectProcessing from './SelectProcessing'
import SelectSachet from './SelectSachet'
import Servings from './Servings'
import AddIcon from '../../../assets/icons/Add'
import EditIcon from '../../../assets/icons/Edit'
import UserIcon from '../../../assets/icons/User'
import DeleteIcon from '../../../assets/icons/Delete'
import CookingSteps from './CookingSteps'

export default function AddIngredients() {
   // fire a query to fill this ingredients array.
   const [ingredients, setIngredients] = useState([])
   // fire a query to fill servings.
   const [servings, setServings] = useState([])

   const { recipeState, recipeDispatch } = useContext(RecipeContext)
   const [tunnels, openTunnel, closeTunnel] = useTunnel(5)

   const deleteIngredientHandler = ingredient => {
      // fire a mutation to delete this ingredient. remember to delete all the sachets associated with it
   }

   return (
      <>
         <Tunnels tunnels={tunnels}>
            <Tunnel layer={1}>
               <AddServings close={closeTunnel} next={closeTunnel} />
            </Tunnel>
            <Tunnel layer={2}>
               <SelectIngredients close={closeTunnel} next={closeTunnel} />
            </Tunnel>
            <Tunnel layer={3} size='lg'>
               <AddSachets close={closeTunnel} openTunnel={openTunnel} />
            </Tunnel>
            {/* tunnel 4 -> select processing */}
            <Tunnel layer={4}>
               <SelectProcessing next={closeTunnel} />
            </Tunnel>

            {/* tunnel 5 -> select Sachet */}
            <Tunnel layer={5}>
               <SelectSachet
                  next={closeTunnel}
                  serving={recipeState.activeServing}
                  ingredient={recipeState.view}
               />
            </Tunnel>
         </Tunnels>
         <Servings open={openTunnel} />
         <IngredientsSection>
            <Stats>
               <Text as='subtitle'>Ingredients ({ingredients.length})</Text>
               {ingredients.length > 0 && (
                  <IconButton type='ghost' onClick={() => openTunnel(2)}>
                     <AddIcon />
                  </IconButton>
               )}
            </Stats>

            {ingredients.length > 0 ? (
               <IngredientTable>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell />
                           <TableCell>Ingredient Name</TableCell>
                           <TableCell align='center'>Processing</TableCell>
                           {servings.map(serving => (
                              <TableCell key={serving.id}>
                                 <UserIcon />
                                 <span style={{ marginLeft: '5px' }}>
                                    {serving.value}
                                 </span>
                              </TableCell>
                           ))}
                           <TableCell align='right' />
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {ingredients.map(ingredient => (
                           <TableRow key={ingredient.id}>
                              <TableCell />
                              <TableCell>{ingredient.title}</TableCell>
                              <TableCell>
                                 {ingredient?.processing?.title || (
                                    <IconButton
                                       type='outline'
                                       onClick={() => {
                                          recipeDispatch({
                                             type: 'SET_VIEW',
                                             payload: ingredient
                                          })
                                          openTunnel(4)
                                       }}
                                    >
                                       <AddIcon color='#00a7e1' />
                                    </IconButton>
                                 )}
                              </TableCell>
                              {servings.map(serving => (
                                 <TableCell key={serving.id}>
                                    <Sachet
                                       ingredient={ingredient}
                                       serving={serving}
                                       openTunnel={openTunnel}
                                    />
                                 </TableCell>
                              ))}
                              <TableCell align='right'>
                                 <span
                                    style={{
                                       display: 'flex'
                                    }}
                                 >
                                    <IconButton
                                       type='solid'
                                       onClick={() => {
                                          openTunnel(3)
                                       }}
                                    >
                                       <EditIcon />
                                    </IconButton>
                                    <IconButton
                                       onClick={() => {
                                          deleteIngredientHandler(ingredient)
                                       }}
                                    >
                                       <DeleteIcon color='rgb(255,90,82)' />
                                    </IconButton>
                                 </span>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </IngredientTable>
            ) : null}

            {ingredients.length === 0 && (
               <ButtonTile
                  as='button'
                  type='secondary'
                  text='Select Ingredients'
                  onClick={() => openTunnel(2)}
               />
            )}
         </IngredientsSection>
         <CookingSteps />
      </>
   )
}

function Sachet({ serving, openTunnel, ingredient }) {
   // query for available sachets for this recipe.
   const [sachets, setSachets] = useState([])
   const { recipeDispatch } = useContext(RecipeContext)

   const sachet = sachets.find(
      sachet =>
         sachet.serving.id === serving.id &&
         sachet.ingredient.id === ingredient.id
   )

   return (
      <>
         {sachet?.title || (
            <SelectButton
               onClick={() => {
                  recipeDispatch({
                     type: 'SET_ACTIVE_SERVING',
                     payload: serving
                  })
                  recipeDispatch({
                     type: 'SET_VIEW',
                     payload: ingredient
                  })
                  openTunnel(5)
               }}
            >
               Select Sachet
            </SelectButton>
         )}
      </>
   )
}
