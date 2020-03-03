import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { 
   Input,
   ComboButton,
   TextButton,
   ButtonTile,
   Tunnel,
   Tunnels,
   useTunnel,
   ListItem,
   List,
   ListOptions,
   ListSearch,
   TagGroup,
   Tag,
   useMultiList
} from '@dailykit/ui'

// Global State
import { Context } from '../../../store/tabs'

// Icons
import { CodeIcon, AddIcon, CloseIcon } from '../../../assets/icons'

// Styled
import { StyledWrapper, StyledTunnelHeader, StyledTunnelMain } from '../styled'
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

const CREATE_INGREDIENT = gql`
   mutation CreateIngredient($ingredient: IngredientInput) {
      createIngredient(input: $ingredient) {
         _id
         name
      }
   }
`

const FETCH_PROCESSING_NAMES = gql`
   {
      processingNames {
         _id
         title
      }
   }
`

const ADD_PROCESSINGS = gql`
   mutation AddProcessings($ingredientId : ID!, $processings: [ProcessingNames!]!) {
      addProcessing(input: {ingredientId : $ingredientId, processings : $processings}) {
         name
         processings {
            _id
            type {
               title
            }
            sachets
         }
      }
   }
`

const IngredientForm = () => {
   const { dispatch } = React.useContext(Context)
   const { loading, error, data } = useQuery(FETCH_PROCESSING_NAMES, { onCompleted : (data) => {processingNamesList.push(...data.processingNames)} });
   const [ingredient, setIngredient] = React.useState({ _id : '', name : '', image : '', processings: [] })
   const [createIngredient] = useMutation(CREATE_INGREDIENT, { onCompleted : (data) => setIngredient(data) })
   const [addProcessings] = useMutation(ADD_PROCESSINGS, { onCompleted : (data) => setIngredient(data) })
   
   const [selectedView, setSelectedView] = React.useState('modes')

   // Processing Tunnel
   const [processingTunnel, openProcessingTunnel, closeProcessingTunnel] = useTunnel(1)
   const [search, setSearch] = React.useState('')
   const [processingNamesList, selectedProcessingNames, selectProcessingName] = useMultiList([])
   const addProcessingsHandler = () => {
      addProcessings({ variables : {ingredientId : ingredient._id, processings : selectedProcessingNames}})
   }

   const createIngredientHandler = () => {
      createIngredient({ variables : {ingredient : { name : ingredient.name } }})
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
                  onBlur={ createIngredientHandler }
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
                     <h2>{ ingredient.processings.length }</h2>
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
                     <h3>Processings ({ ingredient.processings.length })</h3>
                     <AddIcon color="#555B6E" size="18" stroke="2.5"/>
                  </StyledListingHeader>
                  {
                     ingredient.processings &&
                     ingredient.processings.map(processing =>
                        <StyledListingTile active={ false }>
                           <h3>{ processing.type.title }</h3>
                           <p>Sachets: { processing.sachets.length }</p>
                           <p>Recipes: 2000</p>
                        </StyledListingTile>
                     )
                  }
                  <ButtonTile type="primary" size="lg" onClick={ () => openProcessingTunnel(1) }/>
                  <Tunnels tunnels={processingTunnel}>
                     <Tunnel layer={1}>
                        <StyledTunnelHeader>
                           <div>
                              <CloseIcon size="20px" color="#888D9D" onClick={ () => closeProcessingTunnel(1) }/>
                              <h1>Select Processings</h1>
                           </div>
                           <TextButton type="solid" onClick={ addProcessingsHandler }>
                              Save
                           </TextButton>
                        </StyledTunnelHeader>
                        <StyledTunnelMain>
                           <List>
                              <ListSearch
                                 onChange={value => setSearch(value)}
                                 placeholder='type what you’re looking for...'
                              />
                              {selectedProcessingNames.length > 0 && (
                                 <TagGroup style={{ margin: '8px 0' }}>
                                    {selectedProcessingNames.map(option => (
                                       <Tag
                                          key={option._id}
                                          title={option.title}
                                          onClick={() => selectProcessingName('_id', option._id)}
                                       >
                                          {option.title}
                                       </Tag>
                                    ))}
                                 </TagGroup>
                              )}
                              <ListOptions>
                                 {processingNamesList
                                    .filter(option => option.title.toLowerCase().includes(search))
                                    .map(option => (
                                       <ListItem
                                          type='MSL1'
                                          key={option._id}
                                          title={option.title}
                                          onClick={() => selectProcessingName('_id', option._id)}
                                          isActive={selectedProcessingNames.find(item => item._id === option._id)}
                                       />
                                    ))}
                              </ListOptions>
                           </List>
                        </StyledTunnelMain>
                     </Tunnel>
                  </Tunnels>
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