import React from 'react'
import { Input, ComboButton, TextButton, ButtonTile } from '@dailykit/ui'

// Global State
import { Context } from '../../../store/tabs'

// Icons
import { CodeIcon, AddIcon } from '../../../assets/icons'

// Styled
import { StyledWrapper } from '../styled'
import {
   StyledHeader,
   InputWrapper,
   ActionsWrapper,
   StyledMain,
   Container,
   StyledTop,
   StyledStatsContainer,
   StyledStat,
   PhotoTileWrapper,
   StyledSection,
   StyledListing,
   StyledDisplay,
   StyledListingHeader,
   StyledListingTile,
   StyledTabsContainer,
   StyledTab,
   StyledTabContent
} from './styled'

// Internal State
// const initialState = ()

const IngredientForm = () => {

   const { dispatch } = React.useContext(Context)
   const [selectedView, setSelectedView] = React.useState('modes')
   const [ingredient, setIngredient] = React.useState({ name : '', image : '' });

   const createIngredient = async () => {
      try {
         
      } catch(err) {
         console.log(err);
      }
   }


   return (
      <>
      <StyledWrapper>
         <StyledHeader>
            <InputWrapper>
               <Input
                  type='text'
                  placeholder='Untitled Ingredient'
                  name='ingredient'
                  value={ ingredient.name }
                  onChange={e => setIngredient({ ...ingredient, name : e.target.value })}
                  onBlur={ createIngredient }
               />
            </InputWrapper>
            <ActionsWrapper>
               <ComboButton type='ghost'>
                  <CodeIcon /> Open in editor
               </ComboButton>
               <TextButton type='ghost'>Save and Exit</TextButton>
               <TextButton type='solid'>Publish</TextButton>
            </ActionsWrapper>
         </StyledHeader>
      </StyledWrapper>
      <StyledMain>
         <Container>
            <StyledTop>
               <StyledStatsContainer>
                  <StyledStat>
                     <h2>0</h2>
                     <p>Processings</p>
                  </StyledStat>
                  <StyledStat>
                     <h2>0</h2>
                     <p> Sachets </p>
                  </StyledStat>
               </StyledStatsContainer>
               <PhotoTileWrapper>
                  <ButtonTile type="primary" size="sm" text="Add photo to your ingredient" helper="upto 1MB - only JPG, PNG, PDF allowed"/>
               </PhotoTileWrapper>
            </StyledTop>
            <StyledSection>
               <StyledListing>
                  <StyledListingHeader>
                     <h3>Processings (1)</h3>
                     <AddIcon color="#555B6E" size="18" stroke="2.5"/>
                  </StyledListingHeader>
                  <StyledListingTile active={ true }>
                     <h3>Raw</h3>
                     <p>Sachets: 50</p>
                     <p>Recipes: 20</p>
                  </StyledListingTile>
                  <StyledListingTile active={ false }>
                     <h3>Raw</h3>
                     <p>Sachets: 50</p>
                     <p>Recipes: 20</p>
                  </StyledListingTile>
                  <ButtonTile type="primary" size="lg" />
               </StyledListing>
               <StyledDisplay>
                  <StyledSection spacing="md">
                     <StyledListing>
                        <StyledListingHeader>
                           <h3>Sachets (1)</h3>
                           <AddIcon color="#555B6E" size="18" stroke="2.5"/>
                        </StyledListingHeader>
                        <StyledListingTile active={ true }>
                           <h3>200 gm</h3>
                           <p>Active: Real-time</p>
                           <p>Available: 12/40 pkt</p>
                        </StyledListingTile>
                        <ButtonTile type="primary" size="lg" />
                     </StyledListing>
                     <StyledDisplay contains="sachets">
                        <StyledTabsContainer>
                           <StyledTab
                              className={ selectedView === 'modes' ? 'active' : '' }
                              onClick={ () => setSelectedView('modes') }
                           >
                              Modes of fulfillment
                           </StyledTab>
                           <StyledTab
                              className={ selectedView === 'inventory' ? 'active' : '' }
                              onClick={ () => setSelectedView('inventory') }
                           >
                              Inventory
                           </StyledTab>
                        </StyledTabsContainer>
                        <StyledTabContent className={ selectedView === 'modes' ? 'active' : '' }>

                        </StyledTabContent>
                        <StyledTabContent className={ selectedView === 'inventory' ? 'active' : '' }>
                           Inventory
                           {/* Content for inventory will come here! */}
                        </StyledTabContent>
                     </StyledDisplay>
                  </StyledSection>
               </StyledDisplay>
            </StyledSection>
         </Container>
      </StyledMain>
      </>
   )
}

export default IngredientForm