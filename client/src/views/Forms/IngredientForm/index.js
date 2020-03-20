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
   useSingleList,
   RadioGroup
} from '@dailykit/ui'

// Global State
import { Context } from '../../../store/tabs'

// Icons
import {
   CodeIcon,
   AddIcon,
   CloseIcon,
   EditIcon,
   DeleteIcon
} from '../../../assets/icons'

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
   Actions,
   StyledTabsContainer,
   StyledTab,
   StyledTabContent,
   StyledTextAndSelect,
   ToggleWrapper,
   StyledTable,
   ImageContainer
} from './styled'

// Internal State
// const initialState = ()

const INGREDIENT = gql`
   query Ingredient($ID: ID!) {
      ingredient(id: $ID) {
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
            recipes
         }
         sachets
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

const FETCH_PACKAGINGS = gql`
   {
      packagings {
         _id
         title
      }
   }
`

const FETCH_LABEL_TEMPLATES = gql`
   {
      labelTemplates {
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
         recipes
      }
   }
`

const DELETE_PROCESSING = gql`
   mutation DeleteProcessing($input: DeleteProcessingInput) {
      deleteProcessing(input: $input) {
         success
         message
         ID
      }
   }
`

const ADD_SACHET = gql`
   mutation AddSachet($input: AddSachetInput!) {
      addSachet(input: $input) {
         ID
         sachet {
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
`

const DELETE_SACHET = gql`
   mutation DeleteSachet($input: DeleteSachetInput!) {
      deleteSachet(input: $input) {
         success
         message
         ID
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
   const {
      loading: packagingsLoading,
      error: packagingsError,
      data: packagingsData
   } = useQuery(FETCH_PACKAGINGS, {
      onCompleted: data => {
         packagingList.push(...data.packagings)
      }
   })
   const {
      loading: labelTemplatesLoading,
      error: labelTemplateError,
      data: labelTemplateData
   } = useQuery(FETCH_LABEL_TEMPLATES, {
      onCompleted: data => {
         labelTemplateList.push(...data.labelTemplates)
      }
   })
   const [sachets, setSachets] = React.useState([])
   const [processings, setProcessings] = React.useState([])
   const [ingredient, setIngredient] = React.useState({
      _id: '',
      name: '',
      image: '',
      sachets: []
   })
   const { loading, error, data } = useQuery(INGREDIENT, {
      variables: { ID: state.current.ID },
      onCompleted: data => {
         setIngredient(data.ingredient)
         setProcessings(data.ingredient.processings)
      }
   })

   const [updateIngredient] = useMutation(UPDATE_INGREDIENT, {
      onCompleted: data => {
         setIngredient({ ...ingredient, ...data.updateIngredient })
      }
   })
   const [addProcessings] = useMutation(ADD_PROCESSINGS, {
      onCompleted: data => {
         console.log(data)
         setProcessings(data.addProcessings)
      }
   })
   const [deleteProcessing] = useMutation(DELETE_PROCESSING, {
      onCompleted: data => {
         console.log(data.deleteProcessing)
         if (data.deleteProcessing.success) {
            const newProcessings = processings.filter(
               processing => processing._id !== data.deleteProcessing.ID
            )
            setProcessings(newProcessings)
         }
      }
   })
   const [addSachet] = useMutation(ADD_SACHET, {
      onCompleted: data => {
         let copyProcessings = processings
         const index = copyProcessings.findIndex(
            proc => proc._id === data.addSachet.ID
         )
         copyProcessings[index].sachets.push(data.addSachet.sachet)
         setProcessings(copyProcessings)
         setSelectedSachetID(data.addSachet.sachet._id)
         const newSachets = [...ingredient.sachets, data.addSachet.sachet._id]
         setIngredient({ ...ingredient, sachets: newSachets })
      }
   })
   const [deleteSachet] = useMutation(DELETE_SACHET, {
      onCompleted: data => {
         console.log(data)
         let copyProcessings = processings
         const index = copyProcessings.findIndex(
            proc => proc._id === selectedProcessingID
         )
         let updatedProcessing = copyProcessings[index]
         updatedProcessing.sachets = updatedProcessing.sachets.filter(
            sachet => sachet._id !== data.deleteSachet.ID
         )
         copyProcessings[index] = updatedProcessing
         setProcessings(copyProcessings)
         let copySachets = ingredient.sachets.filter(
            id => id !== data.deleteSachet.ID
         )
         setIngredient({ ...ingredient, sachets: copySachets })
         if (processings[index].sachets.length) {
            setSelectedSachetID(
               processings[index].sachets[processings[index].sachets.length - 1]
                  ._id
            )
         }
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
      if (state.current.title !== ingredient.name) {
         dispatch({
            type: 'SET_TITLE',
            payload: { title: ingredient.name, oldTitle: state.current.title }
         })
      }
   }

   const deleteProcessingHandler = processingId => {
      deleteProcessing({
         variables: {
            input: {
               ingredientId: ingredient._id,
               processingId
            }
         }
      })
   }

   const deleteSachetHandler = sachetId => {
      deleteSachet({
         variables: {
            input: {
               ingredientId: ingredient._id,
               processingId: selectedProcessingID,
               sachetId
            }
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

   // Lists
   const [
      processingNamesList,
      selectedProcessingNames,
      selectProcessingName
   ] = useMultiList([])
   const [stationsList, currentStation, selectStation] = useSingleList([])
   const [
      supplierItemsList,
      currentSupplierItem,
      selectSupplierItem
   ] = useSingleList([])
   const [packagingList, currentPackaging, selectPackaging] = useSingleList([])
   const [
      labelTemplateList,
      currentLabelTemplate,
      selectLabelTemplate
   ] = useSingleList([])

   // Photo Tunnel
   const [photoTunnel, openPhotoTunnel, closePhotoTunnel] = useTunnel(1)
   const addPhotoHandler = image => {
      updateIngredient({
         variables: {
            ingredientId: ingredient._id,
            name: ingredient.name,
            image
         }
      })
      closePhotoTunnel(1)
   }

   // Processing Tunnel
   const [
      processingTunnel,
      openProcessingTunnel,
      closeProcessingTunnel
   ] = useTunnel(1)
   const [search, setSearch] = React.useState('')
   const addProcessingsHandler = () => {
      const names = selectedProcessingNames.map(item => item._id)
      addProcessings({
         variables: { ingredientId: ingredient._id, processingNames: names }
      })
      closeProcessingTunnel(1)
   }

   // Sachet Tunnel
   const [sachetTunnel, openSachetTunnel, closeSachetTunnel] = useTunnel(3)
   const [currentMode, setCurrentMode] = React.useState('')
   const [sachetForm, setSachetForm] = React.useState({
      _id: '',
      quantity: { value: '', unit: '1' },
      tracking: true,
      modes: [
         {
            isActive: false,
            type: 'Real Time',
            station: '',
            supplierItem: '',
            accuracy: 0,
            packaging: '',
            isLabelled: false,
            labelTemplate: ''
         },
         {
            isActive: false,
            type: 'Co-Packer',
            station: '',
            supplierItem: '',
            accuracy: 0,
            packaging: '',
            isLabelled: false,
            labelTemplate: ''
         },
         {
            isActive: false,
            type: 'Planned Lot',
            station: '',
            supplierItem: '',
            accuracy: 0,
            packaging: '',
            isLabelled: false,
            labelTemplate: ''
         }
      ]
   })
   const units = [
      { _id: '1', title: 'gms' },
      { _id: '2', title: 'kgs' },
      { _id: '3', title: 'lbs' }
   ]
   const accuracyOptions = [
      {
         id: 1,
         title: 'Above 50%',
         value: 50
      },
      {
         id: 2,
         title: 'Above 85%',
         value: 85
      },
      {
         id: 3,
         title: "Don't weigh",
         value: 0
      }
   ]
   const [modeForm, setModeForm] = React.useState({
      isActive: false,
      type: '',
      station: '',
      supplierItem: ''
   })

   const selectAccuracyHandler = value => {
      let copySachetForm = sachetForm
      const index = copySachetForm.modes.findIndex(
         mode => mode.type === currentMode
      )
      copySachetForm.modes[index].accuracy = value
      setSachetForm({ ...copySachetForm })
      closeLabelTunnel(1)
   }

   // Packaging Tunnel
   const [
      packagingTunnel,
      openPackagingTunnel,
      closePackagingTunnel
   ] = useTunnel(1)
   const selectPackagingHandler = packaging => {
      selectPackaging('_id', packaging._id)
      let copySachetForm = sachetForm
      const index = copySachetForm.modes.findIndex(
         mode => mode.type === currentMode
      )
      copySachetForm.modes[index].packaging = packaging
      setSachetForm({ ...copySachetForm })
      closePackagingTunnel(1)
   }

   // Lable Ops and Tunnel
   const [labelTunnel, openLabelTunnel, closeLabelTunnel] = useTunnel(1)
   const toggleIsLabelled = checked => {
      let copySachetForm = sachetForm
      const index = copySachetForm.modes.findIndex(
         mode => mode.type === currentMode
      )
      copySachetForm.modes[index].isLabelled = checked
      setSachetForm({ ...copySachetForm })
   }
   const selectLabelTemplateHandler = labelTemplate => {
      let copySachetForm = sachetForm
      const index = copySachetForm.modes.findIndex(
         mode => mode.type === currentMode
      )
      copySachetForm.modes[index].labelTemplate = labelTemplate
      setSachetForm({ ...copySachetForm })
      closeLabelTunnel(1)
   }

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
            return {
               type: mode.type,
               isActive: mode.isActive,
               station: mode.station._id,
               supplierItem: mode.supplierItem._id,
               accuracy: mode.accuracy,
               packaging: mode.packaging._id,
               isLabelled: mode.isLabelled,
               labelTemplate: mode.labelTemplate._id
            }
         })
      cleanSachet.modes = cleanModes
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
      setSachetForm({
         _id: '',
         quantity: { value: '', unit: '1' },
         tracking: true,
         modes: [
            {
               isActive: false,
               type: 'Real Time',
               station: '',
               supplierItem: '',
               packaging: '',
               isLabelled: false,
               labelTemplate: ''
            },
            {
               isActive: false,
               type: 'Co-Packer',
               station: '',
               supplierItem: '',
               packaging: '',
               isLabelled: false,
               labelTemplate: ''
            },
            {
               isActive: false,
               type: 'Planned Lot',
               station: '',
               supplierItem: '',
               packaging: '',
               isLabelled: false,
               labelTemplate: ''
            }
         ]
      })
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
   const selectSupplierItemHandler = item => {
      selectSupplierItem('_id', item._id)
      let copyModeForm = modeForm
      copyModeForm.supplierItem = item
      const index = sachetForm.modes.findIndex(
         mode => mode.type === modeForm.type
      )
      const copySachetForm = sachetForm
      copySachetForm.modes[index] = copyModeForm
      console.log(copySachetForm)
      setSachetForm({ ...copySachetForm })
      closeSachetTunnel(3)
      closeSachetTunnel(2)
      setModeForm({
         isActive: false,
         type: '',
         station: '',
         supplierItem: ''
      })
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
                        <h2>{ingredient.sachets.length}</h2>
                        <p> Sachets </p>
                     </StyledStat>
                  </StyledStatsContainer>
                  {ingredient.image?.length > 0 ? (
                     <ImageContainer>
                        <div>
                           <span onClick={() => openPhotoTunnel(1)}>
                              <EditIcon />
                           </span>
                           <span onClick={() => addPhotoHandler('')}>
                              <DeleteIcon />
                           </span>
                        </div>
                        <img src={ingredient.image} alt='Ingredient' />
                     </ImageContainer>
                  ) : (
                     <PhotoTileWrapper>
                        <ButtonTile
                           type='primary'
                           size='sm'
                           text='Add photo to your ingredient'
                           helper='upto 1MB - only JPG, PNG, PDF allowed'
                           onClick={() => openPhotoTunnel(1)}
                        />
                     </PhotoTileWrapper>
                  )}
                  <Tunnels tunnels={photoTunnel}>
                     <Tunnel layer={1}>
                        <StyledTunnelHeader>
                           <div>
                              <CloseIcon
                                 size='20px'
                                 color='#888D9D'
                                 onClick={() => closePhotoTunnel(1)}
                              />
                              <h1>
                                 Select Photo for ingredient: {ingredient.name}
                              </h1>
                           </div>
                        </StyledTunnelHeader>
                        <StyledTunnelMain>
                           <TextButton
                              type='solid'
                              onClick={() =>
                                 addPhotoHandler(
                                    'https://source.unsplash.com/800x600/?food'
                                 )
                              }
                           >
                              Add Dummy Photo
                           </TextButton>
                        </StyledTunnelMain>
                     </Tunnel>
                  </Tunnels>
               </StyledTop>
               <StyledSection hasElements={processings.length !== 0}>
                  <StyledListing>
                     <StyledListingHeader>
                        <h3>Processings ({processings.length})</h3>
                        <span onClick={() => openProcessingTunnel(1)}>
                           <AddIcon color='#555B6E' size='18' stroke='2.5' />
                        </span>
                     </StyledListingHeader>
                     {processings.length > 0 &&
                        processings.map(processing => (
                           <StyledListingTile
                              key={processing._id}
                              active={processing._id === selectedProcessingID}
                              onClick={() =>
                                 setSelectedProcessingID(processing._id)
                              }
                           >
                              <Actions
                                 active={
                                    processing._id === selectedProcessingID
                                 }
                              >
                                 <span
                                    onClick={() =>
                                       deleteProcessingHandler(processing._id)
                                    }
                                 >
                                    <DeleteIcon />
                                 </span>
                              </Actions>
                              <h3>{processing.name.title}</h3>
                              <p>Sachets: {processing.sachets.length}</p>
                              <p>Recipes: {processing.recipes.length}</p>
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
                  <StyledDisplay hasElements={processings.length !== 0}>
                     <StyledSection
                        spacing='md'
                        hasElements={currentProcessing?.sachets?.length !== 0}
                     >
                        {currentProcessing?.sachets?.length > 0 ? (
                           <>
                              <StyledListing>
                                 <StyledListingHeader>
                                    <h3>
                                       Sachets (
                                       {currentProcessing.sachets.length})
                                    </h3>
                                    <span>
                                       <AddIcon
                                          color='#555B6E'
                                          size='18'
                                          stroke='2.5'
                                          onClick={() => openSachetTunnel(1)}
                                       />
                                    </span>
                                 </StyledListingHeader>
                                 {currentProcessing.sachets.map(sachet => (
                                    <StyledListingTile
                                       active={sachet._id === selectedSachetID}
                                       onClick={() =>
                                          setSelectedSachetID(sachet._id)
                                       }
                                    >
                                       <Actions
                                          active={
                                             sachet._id === selectedSachetID
                                          }
                                       >
                                          <span
                                             onClick={() =>
                                                deleteSachetHandler(sachet._id)
                                             }
                                          >
                                             <DeleteIcon />
                                          </span>
                                       </Actions>
                                       <h3>
                                          {sachet.quantity.value}{' '}
                                          {sachet.quantity.unit}
                                       </h3>
                                       <p>Active: Real-time</p>
                                       <p>Available: 12/40 pkt</p>
                                    </StyledListingTile>
                                 ))}
                                 <ButtonTile
                                    type='primary'
                                    size='lg'
                                    onClick={() => openSachetTunnel(1)}
                                 />
                              </StyledListing>
                              <StyledDisplay
                                 contains='sachets'
                                 hasElements={true}
                              >
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
                                          <th>Supplier item</th>
                                          <th>Accuracy range</th>
                                          <th>Packaging</th>
                                          <th>Label</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {sachetForm.modes.map(mode => (
                                          <tr
                                             key={mode.type}
                                             onClick={() =>
                                                setCurrentMode(mode.type)
                                             }
                                          >
                                             <td>
                                                <Checkbox
                                                   checked={mode.isActive}
                                                   onChange={val =>
                                                      toggleMode(val, mode.type)
                                                   }
                                                />
                                                {mode.type}
                                             </td>
                                             <td>{mode.station.title}</td>
                                             <td>{mode.supplierItem.title}</td>
                                             <td>
                                                <RadioGroup
                                                   options={accuracyOptions}
                                                   active={2}
                                                   onChange={option =>
                                                      selectAccuracyHandler(
                                                         option.value
                                                      )
                                                   }
                                                />
                                             </td>
                                             <td>
                                                <ButtonTile
                                                   type='secondary'
                                                   text='Packaging'
                                                   onClick={() =>
                                                      openPackagingTunnel(1)
                                                   }
                                                />
                                             </td>
                                             <td>
                                                <Toggle
                                                   checked={mode.isLabelled}
                                                   setChecked={val =>
                                                      toggleIsLabelled(val)
                                                   }
                                                />
                                                {mode.isLabelled && (
                                                   <ButtonTile
                                                      noIcon
                                                      type='secondary'
                                                      text='Select Sub Title'
                                                      onClick={() =>
                                                         openLabelTunnel(1)
                                                      }
                                                   />
                                                )}
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
                              </StyledTunnelHeader>
                              <StyledTunnelMain>
                                 <List>
                                    {Object.keys(currentSupplierItem).length >
                                    0 ? (
                                       <ListItem
                                          type='SSL1'
                                          title={currentSupplierItem.title}
                                       />
                                    ) : (
                                       <ListSearch
                                          onChange={value => setSearch(value)}
                                          placeholder='type what you’re looking for...'
                                       />
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
                                                type='SSL1'
                                                key={option._id}
                                                title={option.title}
                                                isActive={
                                                   option._id ===
                                                   currentSupplierItem._id
                                                }
                                                onClick={() =>
                                                   selectSupplierItemHandler(
                                                      option
                                                   )
                                                }
                                             />
                                          ))}
                                    </ListOptions>
                                 </List>
                              </StyledTunnelMain>
                           </Tunnel>
                        </Tunnels>
                        <Tunnels tunnels={packagingTunnel}>
                           <Tunnel layer={1}>
                              <StyledTunnelHeader>
                                 <div>
                                    <CloseIcon
                                       size='20px'
                                       color='#888D9D'
                                       onClick={() => closePackagingTunnel(1)}
                                    />
                                    <h1>
                                       Add Packaging for Processing:{' '}
                                       {currentProcessing?.name?.title}
                                    </h1>
                                 </div>
                              </StyledTunnelHeader>
                              <StyledTunnelMain>
                                 <List>
                                    {Object.keys(currentPackaging).length >
                                    0 ? (
                                       <ListItem
                                          type='SSL1'
                                          title={currentPackaging.title}
                                       />
                                    ) : (
                                       <ListSearch
                                          onChange={value => setSearch(value)}
                                          placeholder='type what you’re looking for...'
                                       />
                                    )}
                                    <ListOptions>
                                       {packagingList
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
                                                   currentPackaging._id
                                                }
                                                onClick={() =>
                                                   selectPackagingHandler(
                                                      option
                                                   )
                                                }
                                             />
                                          ))}
                                    </ListOptions>
                                 </List>
                              </StyledTunnelMain>
                           </Tunnel>
                        </Tunnels>
                        <Tunnels tunnels={labelTunnel}>
                           <Tunnel layer={1}>
                              <StyledTunnelHeader>
                                 <div>
                                    <CloseIcon
                                       size='20px'
                                       color='#888D9D'
                                       onClick={() => closeLabelTunnel(1)}
                                    />
                                    <h1>
                                       Add Label Template for Processing:{' '}
                                       {currentProcessing?.name?.title}
                                    </h1>
                                 </div>
                              </StyledTunnelHeader>
                              <StyledTunnelMain>
                                 <List>
                                    {Object.keys(currentLabelTemplate).length >
                                    0 ? (
                                       <ListItem
                                          type='SSL1'
                                          title={currentLabelTemplate.title}
                                       />
                                    ) : (
                                       <ListSearch
                                          onChange={value => setSearch(value)}
                                          placeholder='type what you’re looking for...'
                                       />
                                    )}
                                    <ListOptions>
                                       {labelTemplateList
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
                                                   currentLabelTemplate._id
                                                }
                                                onClick={() =>
                                                   selectLabelTemplateHandler(
                                                      option
                                                   )
                                                }
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
