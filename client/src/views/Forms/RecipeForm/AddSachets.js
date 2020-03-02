import React from 'react'
import { Text, ButtonTile, TextButton } from '@dailykit/ui'

import { TunnelContainer, Content, FlexWidth, ManageIngredient } from './styled'

import { TunnelHeader, Spacer } from '../../../components/index'

export default function AddSachets({ close }) {
   return (
      <TunnelContainer>
         <TunnelHeader
            title='Add Ingredients'
            close={() => close(3)}
            next={() => {}}
         />

         <Spacer />
         <Content>
            <FlexWidth width='1'>
               {/* TODO: add buttons for adding more ingredients when doing functionality part */}
               <Text as='subtitle'>Ingredients (0)</Text>

               <div>
                  <TextButton type='solid'>Potato</TextButton>
               </div>

               <div>
                  <TextButton type='solid'>Dry Chilli</TextButton>
               </div>

               <div>
                  <TextButton type='solid'>Onion</TextButton>
               </div>
            </FlexWidth>
            <FlexWidth width='3'>
               {/* TODO: add preference for processing, sachets and processing for the ingredient */}
               <ManageIngredient>
                  <Content>
                     <FlexWidth width='1'>
                        <Text as='h2'>Potato</Text>
                     </FlexWidth>
                     <FlexWidth width='3'>
                        <ButtonTile type='secondary' text='Select Processing' />
                     </FlexWidth>
                  </Content>
                  <Content>
                     <FlexWidth width='1'>
                        <Text as='subtitle'>For serving</Text>
                        {/* TODO: functionality: add serving */}
                     </FlexWidth>
                  </Content>
                  <br />
                  <Content>
                     <FlexWidth width='1'>
                        <Text as='h2' style={{ textAlign: 'center' }}>
                           1.
                        </Text>
                     </FlexWidth>
                     <FlexWidth width='3'>
                        <ButtonTile type='secondary' text='Add Sachet' />
                     </FlexWidth>
                  </Content>
               </ManageIngredient>
            </FlexWidth>
         </Content>
      </TunnelContainer>
   )
}
