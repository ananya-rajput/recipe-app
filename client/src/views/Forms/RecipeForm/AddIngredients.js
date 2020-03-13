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
   TableCell
} from '@dailykit/ui'

import { Context as RecipeContext } from '../../../store/recipe/index'

import {
   IngredientsSection,
   IngredientStats,
   IngredientTable,
   SelectButton
} from './styled'

import AddServings from './AddServings'
import SelectIngredients from './SelectIngredients'
import AddSachets from './AddSachets'
import SelectProcessing from './SelectProcessing'
import SelectSachet from './SelectSachet'

export default function AddIngredients() {
   const { recipeState, recipeDispatch } = useContext(RecipeContext)
   const [tunnels, openTunnel, closeTunnel] = useTunnel(5)

   return (
      <>
         <Tunnels tunnels={tunnels}>
            <Tunnel layer={1}>
               <AddServings close={closeTunnel} next={openTunnel} />
            </Tunnel>
            <Tunnel layer={2}>
               <SelectIngredients close={closeTunnel} next={openTunnel} />
            </Tunnel>
            <Tunnel layer={3} size='lg'>
               <AddSachets close={closeTunnel} openTunnel={openTunnel} />
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
         <IngredientsSection>
            <IngredientStats>
               <Text as='subtitle'>
                  Ingredients ({recipeState.ingredients.length})
               </Text>

               {recipeState.ingredients.length > 0 ? (
                  <IngredientTable>
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableCell></TableCell>
                              <TableCell>Ingredient Name</TableCell>
                              <TableCell>Processing</TableCell>
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
                                       <SelectButton
                                          onClick={() => {
                                             recipeDispatch({
                                                type: 'SET_VIEW',
                                                payload: ingredient
                                             })
                                             openTunnel(4)
                                          }}
                                       >
                                          Select Processing
                                       </SelectButton>
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
            </IngredientStats>
            <ButtonTile
               as='button'
               type='secondary'
               text='Add Ingredient'
               onClick={() => openTunnel(1)}
            />
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
