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
   StyledListingTile
} from './styled'

// Internal State
// const initialState = ()

const IngredientForm = () => {

   const { dispatch } = React.useContext(Context)
   // const [ingredient, dispatchIngredient] = React.useReducer(reducer, initialState)

   return (
      <>
      <StyledWrapper>
         <StyledHeader>
            <InputWrapper>
               <Input
                  type='text'
                  placeholder='Untitled Ingredient'
                  name='username'
                  value={''}
                  onChange={e => console.log(e)}
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
                        {/* Upon clicking, Sachet info will be displayed here! */}
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