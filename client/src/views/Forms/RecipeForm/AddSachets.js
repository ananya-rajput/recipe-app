import React from 'react'
import { Text, ButtonTile, TextButton } from '@dailykit/ui'

import { TunnelHeader, Spacer } from '../../../components/index'

export default function AddSachets({ close }) {
   return (
      <div style={{ padding: '30px' }}>
         <TunnelHeader
            title='Add Ingredients'
            close={() => close(3)}
            next={() => {}}
         />

         <Spacer />
         <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
               {/* TODO: add buttons for adding more ingredients when doing functionality part */}
               <Text as='subtitle'>Ingredients (0)</Text>

               <ul style={{ listStyle: 'none', marginTop: '10px' }}>
                  <li>
                     <TextButton type='solid'>Potato</TextButton>
                  </li>
                  <li>
                     <TextButton type='solid'>Dry Chilli</TextButton>
                  </li>
                  <li>
                     <TextButton type='solid'>Onion</TextButton>
                  </li>
               </ul>
            </div>
            <div style={{ flex: 3 }}>
               {/* TODO: add preference for processing, sachets and processing for the ingredient */}
               <div
                  style={{
                     border: '1px solid #ECECEC',
                     marginTop: '18px',
                     padding: '20px'
                  }}
               >
                  <div style={{ display: 'flex' }}>
                     <div style={{ flex: 1 }}>
                        <Text as='h2'>Potato</Text>
                     </div>
                     <div style={{ flex: 3 }}>
                        <ButtonTile type='secondary' text='Select Processing' />
                     </div>
                  </div>
                  <div styl={{ display: 'flex' }}>
                     <div style={{ flex: 1 }}>
                        <Text as='subtitle'>For serving</Text>
                        {/* TODO: functionality: add serving */}
                     </div>
                  </div>
                  <div style={{ display: 'flex', marginTop: '15px' }}>
                     <div style={{ flex: 1 }}>
                        <Text as='h2' style={{ textAlign: 'center' }}>
                           1.
                        </Text>
                     </div>
                     <div style={{ flex: 3 }}>
                        <ButtonTile type='secondary' text='Add Sachet' />
                     </div>
                  </div>
                  <div style={{ display: 'flex', marginTop: '15px' }}>
                     <div style={{ flex: 1 }}>
                        <Text as='h2' style={{ textAlign: 'center' }}>
                           2.
                        </Text>
                     </div>
                     <div style={{ flex: 3 }}>
                        <ButtonTile type='secondary' text='Add Sachet' />
                     </div>
                  </div>
                  <div style={{ display: 'flex', marginTop: '15px' }}>
                     <div style={{ flex: 1 }}>
                        <Text as='h2' style={{ textAlign: 'center' }}>
                           3.
                        </Text>
                     </div>
                     <div style={{ flex: 3 }}>
                        <ButtonTile type='secondary' text='Add Sachet' />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
