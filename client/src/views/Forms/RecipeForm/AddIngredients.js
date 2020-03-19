import React, { useContext } from 'react'

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

export default function AddIngredients() {
   const { recipeState, recipeDispatch } = useContext(RecipeContext)
   const [tunnels, openTunnel, closeTunnel] = useTunnel(5)

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
               <AddSachets close={closeTunnel} openTunnel={closeTunnel} />
            </Tunnel>
            {/* tunnel 1 -> select processing */}
            <Tunnel layer={4}>
               <SelectProcessing next={closeTunnel} />
            </Tunnel>

            {/* tunnel 5 -> select Sachet */}
            <Tunnel layer={5}>
               <SelectSachet
                  next={closeTunnel}
                  serving={recipeState.activeServing}
               />
            </Tunnel>
         </Tunnels>
         <Servings open={openTunnel} />
         <IngredientsSection>
            <Stats>
               <Text as='subtitle'>
                  Ingredients ({recipeState.ingredients.length})
               </Text>
               {recipeState.ingredients.length > 0 && (
                  <IconButton type='ghost' onClick={() => openTunnel(2)}>
                     <EditIcon />
                  </IconButton>
               )}
            </Stats>

            {recipeState.ingredients.length > 0 ? (
               <IngredientTable>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell></TableCell>
                           <TableCell>Ingredient Name</TableCell>
                           <TableCell align='center'>Processing</TableCell>
                           {recipeState.servings.map(serving => (
                              <TableCell key={serving.id}>
                                 {serving.value}
                              </TableCell>
                           ))}
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {recipeState.ingredients.map(ingredient => (
                           <TableRow key={ingredient.id}>
                              <TableCell></TableCell>
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
                              {recipeState.servings.map(serving => (
                                 <TableCell key={serving.id}>
                                    <Sachet
                                       ingredient={ingredient}
                                       serving={serving}
                                       openTunnel={openTunnel}
                                    />
                                 </TableCell>
                              ))}
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </IngredientTable>
            ) : null}

            {recipeState.ingredients.length === 0 && (
               <ButtonTile
                  as='button'
                  type='secondary'
                  text='Select Ingredients'
                  onClick={() => openTunnel(2)}
               />
            )}
         </IngredientsSection>
      </>
   )
}

function Sachet({ serving, openTunnel, ingredient }) {
   const { recipeState, recipeDispatch } = useContext(RecipeContext)

   const sachet = recipeState.sachets.find(
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
