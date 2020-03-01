import React from 'react'
import { TextButton, Text, Input, ButtonTile } from '@dailykit/ui'

export default function AddServings({ close, next }) {
   return (
      <div style={{ padding: '30px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <TextButton onClick={() => close(1)} type='ghost'>
                  X
               </TextButton>
               <h1>Add Servings</h1>
            </div>
            <div>
               <TextButton type='solid' onClick={() => next(2)}>
                  Next
               </TextButton>
            </div>
         </div>
         <br />
         <hr style={{ border: '1px solid #E4E4E4' }} />
         <br />
         <div>
            <Text as='subtitle'>Enter Servings:</Text>
            <br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <div style={{ marginRight: '5px' }}>1.</div>
               <Input type='text' label='enter' name='serving1' value='' />
            </div>
            <br />
            <ButtonTile
               as='button'
               type='secondary'
               text='Add more servings'
               onClick={() => {}}
            />
         </div>
      </div>
   )
}
