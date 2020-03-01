import React from 'react'
import { TextButton, Text, ButtonTile } from '@dailykit/ui'

export default function AddSachets({ close }) {
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
         <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
               {/* TODO: add buttons for adding more ingredients when doing functionality part */}
               <h4
                  style={{
                     fontSize: 16,
                     color: '#888D9D'
                  }}
               >
                  Ingredients (0)
               </h4>

               <ul style={{ listStyle: 'none', marginTop: '10px' }}>
                  <li>
                     <button
                        style={{
                           width: '90%',
                           backgroundColor: '#555B6E',
                           padding: '15px 10px',
                           color: '#fff',
                           border: 0,
                           borderBottom: '1px solid #ECECEC',
                           textAlign: 'left',
                           fontSize: '14px'
                        }}
                     >
                        Potato
                     </button>
                  </li>
                  <li>
                     <button
                        style={{
                           width: '90%',
                           backgroundColor: '#fff',
                           padding: '15px 10px',
                           color: '#555B6E',
                           border: 0,
                           borderBottom: '1px solid #ECECEC',
                           textAlign: 'left',
                           fontSize: '14px'
                        }}
                     >
                        Dry Chilli
                     </button>
                  </li>
                  <li>
                     <button
                        style={{
                           width: '90%',
                           backgroundColor: '#fff',
                           padding: '15px 10px',
                           color: '#555B6E',
                           border: 0,
                           borderBottom: '1px solid #ECECEC',
                           textAlign: 'left',
                           fontSize: '14px'
                        }}
                     >
                        Onion
                     </button>
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
