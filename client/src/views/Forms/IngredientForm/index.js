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
   useMultiList,
   Toggle,
   Checkbox,
   useSingleList
} from '@dailykit/ui'

// Global State
import { Context } from '../../../store/tabs'

// Icons
import { CodeIcon, AddIcon, CloseIcon } from '../../../assets/icons'

// Styled
import {
   StyledWrapper,
   StyledTunnelHeader,
   StyledTunnelMain,
   StyledSelect
} from '../styled'
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
   StyledTabContent,
   StyledTextAndSelect,
   ToggleWrapper,
   StyledTable
} from './styled'

// Internal State
// const initialState = ()

const INGREDIENT = gql`
   query Ingredient($ID: ID!) {
      ingredient(id: $ID) {
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

const FETCH_STATIONS = gql`
   {
      stations {
         _id
         title
      }
   }
`

const FETCH_SUPPLIER_ITEMS = gql`
   {
      supplierItems {
         _id
         title
      }
   }
`

const UPDATE_INGREDIENT = gql`
   mutation UpdateIngredient(
      $ingredientId: ID!
      $name: String!
      $image: String
   ) {
      updateIngredient(
         input: { ingredientId: $ingredientId, name: $name, image: $image }
      ) {
         _id
         name
         image
      }
   }
`

const ADD_PROCESSINGS = gql`
   mutation AddProcessings($ingredientId: ID!, $processingNames: [ID!]!) {
      addProcessings(
         input: {
            ingredientId: $ingredientId
            processingNames: $processingNames
         }
      ) {
         _id
         name
         image
         processings {
            _id
            sachets {
               _id
               quantity {
                  value
                  unit
               }
            }
            name {
               title
            }
         }
      }
   }
`

const ADD_SACHET = gql`
   mutation AddSachet($input: AddSachetInput!) {
      addSachet(input: $input) {
         _id
         name
         processings {
            _id
            name {
               _id
               title
            }
            sachets {
               _id
               quantity {
                  value
                  unit
               }
               modes {
                  type
               }
            }
         }
      }
   }
`

const IngredientForm = () => {
   const { state, dispatch } = React.useContext(Context)
   const {
      loading: processingNamesLoading,
      error: processingNamesError,
      data: processingNamesData
   } = useQuery(FETCH_PROCESSING_NAMES, {
      onCompleted: data => {
         processingNamesList.push(...data.processingNames)
      }
   })
   const {
      loading: stationsLoading,
      error: stationsError,
      data: stationsData
   } = useQuery(FETCH_STATIONS, {
      onCompleted: data => {
         stationsList.push(...data.stations)
      }
   })
   const {
      loading: supplierItemsLoading,
      error: supplierItemsError,
      data: supplierItemsData
   } = useQuery(FETCH_SUPPLIER_ITEMS, {
      onCompleted: data => {
         supplierItemsList.push(...data.supplierItems)
      }
   })
   const [sachets, setSachets] = React.useState([])
   const [processings, setProcessings] = React.useState([])
   const [ingredient, setIngredient] = React.useState({
      _id: '',
      name: '',
      image: ''
   })
   const { loading, error, data } = useQuery(INGREDIENT, {
      variables: { ID: state.current.ID },
      onCompleted: data => {
         setIngredient(data.ingredient)
      }
   })

   const [updateIngredient] = useMutation(UPDATE_INGREDIENT, {
      onCompleted: data => {
         setIngredient(data.updateIngredient)
      }
   })
   const [addProcessings] = useMutation(ADD_PROCESSINGS, {
      onCompleted: data => {
         setIngredient(data.addProcessings)
         setProcessings(data.addProcessings.processings)
      }
   })
   const [addSachet] = useMutation(ADD_SACHET, {
      onCompleted: data => {
         setIngredient(data.addSachet)
         setProcessings(data.addProcessings.processings)
      }
   })

   const updateIngredientHandler = () => {
      updateIngredient({
         variables: {
            ingredientId: ingredient._id,
            name: ingredient.name,
            image: ingredient.image
         }
      })
   }

   // Side Effects
   React.useEffect(() => {
      if (processings.length) {
         setSelectedProcessingID(processings[0]._id)
         setSachets(processings[0].sachets)
      } else {
         setSelectedProcessingID(undefined)
      }
   }, [processings])
   React.useEffect(() => {
      if (sachets.length) {
         setSelectedSachetID(sachets[0]._id)
      } else {
         setSelectedSachetID(undefined)
      }
   }, [sachets])

   // View States
   const [selectedView, setSelectedView] = React.useState('modes')
   const [selectedProcessingID, setSelectedProcessingID] = React.useState(
      undefined
   )
   const [selectedSachetID, setSelectedSachetID] = React.useState(undefined)
   const [currentProcessing, setCurrentProcessing] = React.useState({})
   const [currentSachet, setCurrentSachet] = React.useState({})

   React.useEffect(() => {
      if (selectedProcessingID != undefined) {
         const processing = processings.find(
            processing => processing._id === selectedProcessingID
         )
         setCurrentProcessing(processing)
      }
   }, [selectedProcessingID])
   React.useEffect(() => {
      if (setSelectedSachetID != undefined) {
         const sachet = sachets.find(
            sachet => sachet._id === setSelectedSachetID
         )
         setCurrentSachet(sachet)
      }
   }, [selectedSachetID])

   // Processing Tunnel
   const [
      processingTunnel,
      openProcessingTunnel,
      closeProcessingTunnel
   ] = useTunnel(1)
   const [search, setSearch] = React.useState('')
   const [
      processingNamesList,
      selectedProcessingNames,
      selectProcessingName
   ] = useMultiList([])
   const [stationsList, currentStation, selectStation] = useSingleList([])
   const [
      supplierItemsList,
      selectedSupplierItems,
      selectSupplierItem
   ] = useMultiList([])
   const addProcessingsHandler = () => {
      const names = selectedProcessingNames.map(item => item._id)
      addProcessings({
         variables: { ingredientId: ingredient._id, processingNames: names }
      })
      closeProcessingTunnel(1)
   }

   // Sachet Tunnel
   const [sachetTunnel, openSachetTunnel, closeSachetTunnel] = useTunnel(3)
   const [sachetForm, setSachetForm] = React.useState({
      _id: '',
      quantity: { value: '', unit: '' },
      tracking: true,
      modes: [
         {
            isActive: false,
            type: 'Real Time',
            station: '',
            supplierItems: []
         },
         {
            isActive: false,
            type: 'Co-Packer',
            station: '',
            supplierItems: []
         },
         {
            isActive: false,
            type: 'Planned Lot',
            station: '',
            supplierItems: []
         }
      ]
   })
   const units = [
      { _id: '1', title: 'gms' },
      { _id: '2', title: 'kgs' },
      { _id: '3', title: 'lbs' }
   ]
   const [modeForm, setModeForm] = React.useState({
      isActive: false,
      type: '',
      station: '',
      supplierItems: []
   })
   const addSachetHandler = async () => {
      let cleanSachet = {
         quantity: {
            value: +sachetForm.quantity.value,
            unit: sachetForm.quantity.unit
         },
         tracking: sachetForm.tracking
      }
      let cleanModes = sachetForm.modes
         .filter(mode => {
            // This means mode is configured
            return mode.station !== ''
         })
         .map(mode => {
            let cleanSupplierItems = mode.supplierItems.map(item => {
               return {
                  item: item.item._id,
                  accuracy: item.accuracy,
                  packaging: item.packaging._id,
                  isLabelled: item.isLabelled,
                  labelTemplate: item.labelTemplate._id
               }
            })
            return {
               type: mode.type,
               isActive: mode.isActive,
               station: mode.station._id,
               supplierItems: cleanSupplierItems
            }
         })
      cleanSachet.modes = cleanModes
      console.log(cleanSachet)
      addSachet({
         variables: {
            input: {
               ingredientId: ingredient._id,
               processingId: selectedProcessingID,
               sachet: cleanSachet
            }
         }
      })
      closeSachetTunnel(1)
   }

   // Mode Ops
   const toggleMode = (val, type) => {
      let index = sachetForm.modes.findIndex(mode => mode.type === type)
      sachetForm.modes[index].isActive = !sachetForm.modes[index].isActive
      if (!val) {
         return
      } else {
         // check if it is configured
         if (sachetForm.modes[index].station.length > 0) {
            return
         } else {
            // configure it - open tunnel
            setModeForm(sachetForm.modes[index])
            openSachetTunnel(2)
         }
      }
   }
   const selectStationHandler = station => {
      setModeForm({ ...modeForm, station })
      selectStation('_id', station._id)
      openSachetTunnel(3)
   }
   const addModeHandler = () => {
      const newSupplierItems = selectedSupplierItems.map(item => {
         return {
            item,
            // fields below will be removed, and user will be able to configure these once data gets displayed in the table
            accuracy: 85,
            packaging: {
               _id: '123',
               title: 'Packaging'
            },
            isLabelled: true,
            labelTemplate: {
               _id: '123',
               title: 'Label'
            }
         }
      })
      // setModeForm({ ...modeForm, supplierItems: newSupplierItems })
      const index = sachetForm.modes.findIndex(
         mode => mode.type === modeForm.type
      )
      const copySachetForm = sachetForm
      copySachetForm.modes[index] = modeForm
      copySachetForm.modes[index].supplierItems = newSupplierItems
      console.log(copySachetForm)
      setSachetForm({ ...copySachetForm })
      closeSachetTunnel(3)
      closeSachetTunnel(2)
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
                     value={ingredient.name}
                     onChange={e =>
                        setIngredient({ ...ingredient, name: e.target.value })
                     }
                     onBlur={updateIngredientHandler}
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
                        <h2>{processings.length}</h2>
                        <p>Processings</p>
                     </StyledStat>
                     <StyledStat>
                        <h2>0</h2>
                        <p> Sachets </p>
                     </StyledStat>
                  </StyledStatsContainer>
                  <PhotoTileWrapper>
                     <ButtonTile
                        type='primary'
                        size='sm'
                        text='Add photo to your ingredient'
                        helper='upto 1MB - only JPG, PNG, PDF allowed'
                     />
                  </PhotoTileWrapper>
               </StyledTop>
               <StyledSection>
                  <StyledListing>
                     <StyledListingHeader>
                        <h3>Processings ({processings.length})</h3>
                        <AddIcon color='#555B6E' size='18' stroke='2.5' />
                     </StyledListingHeader>
                     {processings.length > 0 &&
                        processings.map(processing => (
                           <StyledListingTile
                              active={processing._id === selectedProcessingID}
                              onClick={() =>
                                 setSelectedProcessingID(processing._id)
                              }
                           >
                              <h3>{processing.name.title}</h3>
                              <p>Sachets: {processing.sachets.length}</p>
                              <p>Recipes: 2000</p>
                           </StyledListingTile>
                        ))}
                     <ButtonTile
                        type='primary'
                        size='lg'
                        onClick={() => openProcessingTunnel(1)}
                     />
                     <Tunnels tunnels={processingTunnel}>
                        <Tunnel layer={1}>
                           <StyledTunnelHeader>
                              <div>
                                 <CloseIcon
                                    size='20px'
                                    color='#888D9D'
                                    onClick={() => closeProcessingTunnel(1)}
                                 />
                                 <h1>Select Processings</h1>
                              </div>
                              <TextButton
                                 type='solid'
                                 onClick={addProcessingsHandler}
                              >
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
                                             onClick={() =>
                                                selectProcessingName(
                                                   '_id',
                                                   option._id
                                                )
                                             }
                                          >
                                             {option.title}
                                          </Tag>
                                       ))}
                                    </TagGroup>
                                 )}
                                 <ListOptions>
                                    {processingNamesList
                                       .filter(option =>
                                          option.title
                                             .toLowerCase()
                                             .includes(search)
                                       )
                                       .map(option => (
                                          <ListItem
                                             type='MSL1'
                                             key={option._id}
                                             title={option.title}
                                             onClick={() =>
                                                selectProcessingName(
                                                   '_id',
                                                   option._id
                                                )
                                             }
                                             isActive={selectedProcessingNames.find(
                                                item => item._id === option._id
                                             )}
                                          />
                                       ))}
                                 </ListOptions>
                              </List>
                           </StyledTunnelMain>
                        </Tunnel>
                     </Tunnels>
                  </StyledListing>
                  <StyledDisplay>
                     <StyledSection spacing='md'>
                        {currentProcessing.sachets &&
                        currentProcessing.sachets.length > 0 ? (
                           <>
                              <StyledListing>
                                 <StyledListingHeader>
                                    <h3>Sachets (1)</h3>
                                    <AddIcon
                                       color='#555B6E'
                                       size='18'
                                       stroke='2.5'
                                    />
                                 </StyledListingHeader>
                                 <StyledListingTile active={true}>
                                    <h3>200 gm</h3>
                                    <p>Active: Real-time</p>
                                    <p>Available: 12/40 pkt</p>
                                 </StyledListingTile>
                                 <ButtonTile type='primary' size='lg' />
                              </StyledListing>
                              <StyledDisplay contains='sachets'>
                                 <StyledTabsContainer>
                                    <StyledTab
                                       className={
                                          selectedView === 'modes'
                                             ? 'active'
                                             : ''
                                       }
                                       onClick={() => setSelectedView('modes')}
                                    >
                                       Modes of fulfillment
                                    </StyledTab>
                                    <StyledTab
                                       className={
                                          selectedView === 'inventory'
                                             ? 'active'
                                             : ''
                                       }
                                       onClick={() =>
                                          setSelectedView('inventory')
                                       }
                                    >
                                       Inventory
                                    </StyledTab>
                                 </StyledTabsContainer>
                                 <StyledTabContent
                                    className={
                                       selectedView === 'modes' ? 'active' : ''
                                    }
                                 ></StyledTabContent>
                                 <StyledTabContent
                                    className={
                                       selectedView === 'inventory'
                                          ? 'active'
                                          : ''
                                    }
                                 >
                                    Inventory
                                    {/* Content for inventory will come here! */}
                                 </StyledTabContent>
                              </StyledDisplay>
                           </>
                        ) : (
                           <ButtonTile
                              type='primary'
                              size='lg'
                              text='Add Sachet'
                              onClick={() => openSachetTunnel(1)}
                           />
                        )}
                        <Tunnels tunnels={sachetTunnel}>
                           <Tunnel layer={1} size='lg'>
                              <StyledTunnelHeader>
                                 <div>
                                    <CloseIcon
                                       size='20px'
                                       color='#888D9D'
                                       onClick={() => closeSachetTunnel(1)}
                                    />
                                    <h1>
                                       Add Sachet for Processing:{' '}
                                       {currentProcessing?.name?.title}
                                    </h1>
                                 </div>
                                 <TextButton
                                    type='solid'
                                    onClick={addSachetHandler}
                                 >
                                    Save
                                 </TextButton>
                              </StyledTunnelHeader>
                              <StyledTunnelMain>
                                 <StyledTextAndSelect>
                                    <Input
                                       type='text'
                                       placeholder='Enter Quantity'
                                       value={sachetForm.quantity?.value}
                                       onChange={e =>
                                          setSachetForm({
                                             ...sachetForm,
                                             quantity: {
                                                ...sachetForm.quantity,
                                                value: e.target.value
                                             }
                                          })
                                       }
                                    />
                                    <StyledSelect
                                       onChange={e =>
                                          setSachetForm({
                                             ...sachetForm,
                                             quantity: {
                                                ...sachetForm.quantity,
                                                unit: e.target.value
                                             }
                                          })
                                       }
                                    >
                                       {units.map(unit => (
                                          <option
                                             key={unit._id}
                                             value={unit._id}
                                          >
                                             {unit.title}
                                          </option>
                                       ))}
                                    </StyledSelect>
                                 </StyledTextAndSelect>
                                 <ToggleWrapper>
                                    <Toggle
                                       checked={sachetForm.tracking}
                                       label='Take Inventory'
                                       setChecked={value =>
                                          setSachetForm({
                                             ...sachetForm,
                                             tracking: value
                                          })
                                       }
                                    />
                                 </ToggleWrapper>
                                 <StyledTable cellSpacing={0}>
                                    <thead>
                                       <tr>
                                          <th>Mode of fulfillment</th>
                                          <th>Station</th>
                                          <th>Supplier items</th>
                                          <th>Accuracy range</th>
                                          <th>Packaging</th>
                                          <th>Label</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {sachetForm.modes.map(mode => (
                                          <tr key={mode.type}>
                                             <td
                                                rowSpan={
                                                   mode.supplierItems.length
                                                      ? mode.supplierItems
                                                           .length
                                                      : 1
                                                }
                                             >
                                                <Checkbox
                                                   checked={mode.isActive}
                                                   onChange={val =>
                                                      toggleMode(val, mode.type)
                                                   }
                                                />
                                                {mode.type}
                                             </td>
                                             <td
                                                rowSpan={
                                                   mode.supplierItems.length
                                                      ? mode.supplierItems
                                                           .length
                                                      : 1
                                                }
                                             >
                                                {mode.station.title}
                                             </td>
                                             <td>
                                                <table>
                                                   {mode.supplierItems.map(
                                                      (item, index) => (
                                                         <tr key={index}>
                                                            <td>
                                                               {item.item.title}
                                                            </td>
                                                            <td>
                                                               {item.item.title}
                                                            </td>
                                                            <td>
                                                               {item.item.title}
                                                            </td>
                                                            <td>
                                                               {item.item.title}
                                                            </td>
                                                         </tr>
                                                      )
                                                   )}
                                                </table>
                                             </td>
                                          </tr>
                                       ))}
                                    </tbody>
                                 </StyledTable>
                              </StyledTunnelMain>
                           </Tunnel>
                           <Tunnel layer={2}>
                              <StyledTunnelHeader>
                                 <div>
                                    <CloseIcon
                                       size='20px'
                                       color='#888D9D'
                                       onClick={() => closeSachetTunnel(2)}
                                    />
                                    <h1>
                                       Select station for: {modeForm?.type}
                                    </h1>
                                 </div>
                              </StyledTunnelHeader>
                              <StyledTunnelMain>
                                 <List>
                                    {Object.keys(currentStation).length > 0 ? (
                                       <ListItem
                                          type='SSL1'
                                          title={currentStation.title}
                                       />
                                    ) : (
                                       <ListSearch
                                          onChange={value => setSearch(value)}
                                          placeholder='type what you’re looking for...'
                                       />
                                    )}
                                    <ListOptions>
                                       {stationsList
                                          .filter(option =>
                                             option.title
                                                .toLowerCase()
                                                .includes(search)
                                          )
                                          .map(option => (
                                             <ListItem
                                                type='SSL1'
                                                key={option._id}
                                                title={option.title}
                                                isActive={
                                                   option._id ===
                                                   currentStation._id
                                                }
                                                onClick={() =>
                                                   selectStationHandler(option)
                                                }
                                             />
                                          ))}
                                    </ListOptions>
                                 </List>
                              </StyledTunnelMain>
                           </Tunnel>
                           <Tunnel layer={3}>
                              <StyledTunnelHeader>
                                 <div>
                                    <CloseIcon
                                       size='20px'
                                       color='#888D9D'
                                       onClick={() => closeSachetTunnel(3)}
                                    />
                                    <h1>
                                       Select Supplier items for:{' '}
                                       {modeForm?.station.title}
                                    </h1>
                                 </div>
                                 <TextButton
                                    type='solid'
                                    onClick={addModeHandler}
                                 >
                                    Save
                                 </TextButton>
                              </StyledTunnelHeader>
                              <StyledTunnelMain>
                                 <List>
                                    <ListSearch
                                       onChange={value => setSearch(value)}
                                       placeholder='type what you’re looking for...'
                                    />
                                    {selectedSupplierItems.length > 0 && (
                                       <TagGroup style={{ margin: '8px 0' }}>
                                          {selectedSupplierItems.map(option => (
                                             <Tag
                                                key={option.id}
                                                title={option.title}
                                                onClick={() =>
                                                   selectSupplierItem(
                                                      '_id',
                                                      option._id
                                                   )
                                                }
                                             >
                                                {option.title}
                                             </Tag>
                                          ))}
                                       </TagGroup>
                                    )}
                                    <ListOptions>
                                       {supplierItemsList
                                          .filter(option =>
                                             option.title
                                                .toLowerCase()
                                                .includes(search)
                                          )
                                          .map(option => (
                                             <ListItem
                                                type='MSL1'
                                                key={option._id}
                                                title={option.title}
                                                onClick={() =>
                                                   selectSupplierItem(
                                                      '_id',
                                                      option._id
                                                   )
                                                }
                                                isActive={selectedSupplierItems.find(
                                                   item =>
                                                      item._id === option._id
                                                )}
                                             />
                                          ))}
                                    </ListOptions>
                                 </List>
                              </StyledTunnelMain>
                           </Tunnel>
                        </Tunnels>
                     </StyledSection>
                  </StyledDisplay>
               </StyledSection>
            </Container>
         </StyledMain>
      </>
   )
}

export default IngredientForm
