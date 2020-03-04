import React from 'react'
import { Tunnels, Tunnel, useTunnel, ButtonTile, Text } from '@dailykit/ui'

import { IngredientsSection, IngredientStats } from './styled'

import AddServings from './AddServings'
import SelectIngredients from './SelectIngredients'
import AddSachets from './AddSachets'

export default function AddIngredients() {
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
               <Text as='subtitle'>Ingredients (0)</Text>
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
