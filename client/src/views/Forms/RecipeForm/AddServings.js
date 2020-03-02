import React from 'react'
import { Text, Input, ButtonTile } from '@dailykit/ui'

import { TunnelContainer } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'

export default function AddServings({ close, next }) {
   return (
      <TunnelContainer>
         <TunnelHeader
            title='Add Servings'
            close={() => close(1)}
            next={() => next(2)}
         />
         <Spacer />
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
      </TunnelContainer>
   )
}
