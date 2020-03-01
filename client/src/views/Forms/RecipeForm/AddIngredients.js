import React from 'react'
import { Tunnels, Tunnel, useTunnel, ButtonTile } from '@dailykit/ui'

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
