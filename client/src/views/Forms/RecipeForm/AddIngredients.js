import React, { useContext, useEffect } from 'react'

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

import { IngredientsSection, IngredientStats, IngredientTable } from './styled'

import AddServings from './AddServings'
import SelectIngredients from './SelectIngredients'
import AddSachets from './AddSachets'

export default function AddIngredients() {
   const { recipeState } = useContext(RecipeContext)
   const [tunnels, openTunnel, closeTunnel] = useTunnel(3)

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
               <AddSachets close={closeTunnel} />
            </Tunnel>
         </Tunnels>
         <IngredientsSection>
            <IngredientStats>
               <Text as='subtitle'>
                  Ingredients ({recipeState.ingredients.length})
               </Text>

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
                                 {ingredient?.processing?.title}
                              </TableCell>
                              {recipeState.servings.map(serving => (
                                 <TableCell key={serving.id}>
                                    <Sachet serving={serving} />
                                 </TableCell>
                              ))}
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </IngredientTable>
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

function Sachet({ serving }) {
   const { recipeState } = useContext(RecipeContext)

   const sachet = recipeState.sachets.find(
      sachet => sachet.serving.id === serving.id
   )

   return <>{sachet?.title}</>
}
