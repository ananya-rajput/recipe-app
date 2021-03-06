import React from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import {
   ButtonTile,
   Tunnels,
   Tunnel,
   useTunnel,
   TextButton,
   List,
   ListOptions,
   ListSearch,
   ListItem,
   Toggle,
   Checkbox,
   useSingleList,
   Input,
   RadioGroup,
   Tag
} from '@dailykit/ui'

import { AddIcon, DeleteIcon, CloseIcon } from '../../assets/icons'
import {
   StyledSection,
   StyledListing,
   StyledListingHeader,
   StyledListingTile,
   StyledDisplay,
   Actions,
   StyledTab,
   StyledTabsContainer,
   StyledTunnelHeader,
   StyledTunnelMain,
   StyledTabContent,
   StyledTable,
   StyledSelect,
   StyledTextAndSelect,
   ToggleWrapper
} from '../styled'
import {
   SACHETS_OF_PROCESSING,
   FETCH_UNITS,
   FETCH_SUPPLIER_ITEMS,
   FETCH_STATIONS,
   FETCH_PACKAGINGS,
   FETCH_LABEL_TEMPLATES,
   CREATE_SACHET,
   DELETE_SACHET
} from '../../graphql'
import { Sachet } from '../'

const Sachets = ({ ingredientId, processingId, processingName }) => {
   // State
   const [sachets, setSachets] = React.useState([])
   const [selectedIndex, setSelectedIndex] = React.useState(0)
   const [units, setUnits] = React.useState([])
   const [selectedView, setSelectedView] = React.useState('modes')
   const [search, setSearch] = React.useState('')
   const [currentMode, setCurrentMode] = React.useState('')
   const [sachetForm, setSachetForm] = React.useState({
      id: '',
      quantity: { value: '', unit: '' },
      tracking: true,
      modes: [
         {
            isActive: false,
            type: 'Real Time',
            station: '',
            supplierItems: [
               {
                  item: '',
                  accuracy: 0,
                  packaging: '',
                  isLabelled: false,
                  labelTemplate: ''
               }
            ]
         },
         {
            isActive: false,
            type: 'Co-Packer',
            station: '',
            supplierItems: [
               {
                  item: '',
                  accuracy: 0,
                  packaging: '',
                  isLabelled: false,
                  labelTemplate: ''
               }
            ]
         },
         {
            isActive: false,
            type: 'Planned Lot',
            station: '',
            supplierItems: [
               {
                  item: '',
                  accuracy: 0,
                  packaging: '',
                  isLabelled: false,
                  labelTemplate: ''
               }
            ]
         }
      ]
   })
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
      supplierItems: [
         {
            item: '',
            accuracy: 0,
            packaging: '',
            isLabelled: false,
            labelTemplate: ''
         }
      ]
   })

   // Queries and Mutations
   const [fetchSachets, {}] = useLazyQuery(SACHETS_OF_PROCESSING, {
      onCompleted: data => {
         setSachets(data.processing.sachets)
      }
   })
   const [fetchUnits, {}] = useLazyQuery(FETCH_UNITS, {
      onCompleted: data => {
         setUnits(data.units)
      }
   })
   const [fetchStations, {}] = useLazyQuery(FETCH_STATIONS, {
      onCompleted: data => {
         stationsList.length = 0
         stationsList.push(...data.stations)
      }
   })
   const [fetchSupplierItems, {}] = useLazyQuery(FETCH_SUPPLIER_ITEMS, {
      onCompleted: data => {
         supplierItemsList.length = 0
         supplierItemsList.push(...data.supplierItems)
      }
   })
   const [fetchPackagings, {}] = useLazyQuery(FETCH_PACKAGINGS, {
      onCompleted: data => {
         packagingList.length = 0
         packagingList.push(...data.packagings)
      }
   })
   const [fetchLabelTemplates, {}] = useLazyQuery(FETCH_LABEL_TEMPLATES, {
      onCompleted: data => {
         labelTemplateList.length = 0
         labelTemplateList.push(...data.labelTemplates)
      }
   })
   const [createSachet] = useMutation(CREATE_SACHET, {
      onCompleted: data => {
         if (data.createSachet.success) {
            setSachets([...sachets, data.createSachet.sachet])
         } else {
            // Fire toast
            console.log('Sachet not created!')
         }
      },
      refetchQueries: [
         {
            query: SACHETS_OF_PROCESSING,
            variables: { processingId }
         }
      ]
   })
   const [deleteSachet] = useMutation(DELETE_SACHET, {
      onCompleted: data => {
         if (data.deleteSachet.success) {
            const updatedSachets = sachets.filter(
               sachet => sachet.id !== data.deleteSachet.sachet.id
            )
            setSachets(updatedSachets)
            if (updatedSachets.length) setSelectedIndex(selectedIndex - 1)
            else setSelectedIndex(0)
         } else {
            // Fire toast
            console.log('Sachet could not be deleted!')
         }
      },
      update: (
         cache,
         {
            data: {
               deleteSachet: { sachet }
            }
         }
      ) => {
         const { processing: cached_processing } = cache.readQuery({
            query: SACHETS_OF_PROCESSING,
            variables: { processingId }
         })
         cache.writeQuery({
            query: SACHETS_OF_PROCESSING,
            variables: { processingId },
            data: {
               processing: {
                  ...cached_processing,
                  sachets: cached_processing.sachets.filter(
                     sach => sach.id !== sachet.id
                  )
               }
            }
         })
      }
   })

   // Side Effects
   React.useEffect(() => {
      if (processingId && processingId.length) {
         fetchSachets({
            variables: {
               processingId
            }
         })
      }
   }, [processingId])

   //Lists
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

   const deleteSachetHandler = sachetId => {
      deleteSachet({
         variables: {
            input: {
               ingredientId,
               processingId,
               sachetId
            }
         }
      })
   }

   // Tunnels
   const [sachetTunnel, openSachetTunnel, closeSachetTunnel] = useTunnel(3)
   const [
      packagingTunnel,
      openPackagingTunnel,
      closePackagingTunnel
   ] = useTunnel(1)
   const [labelTunnel, openLabelTunnel, closeLabelTunnel] = useTunnel(1)

   // Handlers
   const selectAccuracyHandler = value => {
      let copySachetForm = sachetForm
      const index = copySachetForm.modes.findIndex(
         mode => mode.type === currentMode
      )
      copySachetForm.modes[index].supplierItems[0].accuracy = value
      setSachetForm({ ...copySachetForm })
      closeLabelTunnel(1)
   }

   const selectPackagingHandler = packaging => {
      selectPackaging('id', packaging.id)
      let copySachetForm = sachetForm
      const index = copySachetForm.modes.findIndex(
         mode => mode.type === currentMode
      )
      copySachetForm.modes[index].supplierItems[0].packaging = packaging
      setSachetForm({ ...copySachetForm })
      closePackagingTunnel(1)
   }

   const toggleIsLabelled = checked => {
      let copySachetForm = sachetForm
      const index = copySachetForm.modes.findIndex(
         mode => mode.type === currentMode
      )
      copySachetForm.modes[index].supplierItems[0].isLabelled = checked
      setSachetForm({ ...copySachetForm })
   }
   const selectLabelTemplateHandler = labelTemplate => {
      let copySachetForm = sachetForm
      const index = copySachetForm.modes.findIndex(
         mode => mode.type === currentMode
      )
      copySachetForm.modes[index].supplierItems[0].labelTemplate = labelTemplate
      setSachetForm({ ...copySachetForm })
      closeLabelTunnel(1)
   }

   const createSachetHandler = async () => {
      let cleanSachet = {
         quantity: {
            value: +sachetForm.quantity.value,
            unit:
               sachetForm.quantity.unit.length > 0
                  ? sachetForm.quantity.unit
                  : units[0].id
         },
         tracking: sachetForm.tracking
      }
      let cleanModes = sachetForm.modes
         .filter(mode => {
            // This means mode is configured
            return mode.station !== ''
         })
         .map(mode => {
            const cleanSupplierItems = mode.supplierItems.map(supplierItem => {
               return {
                  item: supplierItem.item.id,
                  accuracy: supplierItem.accuracy,
                  packaging: supplierItem.packaging.id,
                  isLabelled: supplierItem.isLabelled,
                  labelTemplate: supplierItem.labelTemplate.id
               }
            })
            return {
               type: mode.type,
               isActive: mode.isActive,
               station: mode.station.id,
               supplierItems: cleanSupplierItems
            }
         })
      cleanSachet.modes = cleanModes
      createSachet({
         variables: {
            input: {
               ingredientId,
               processingId,
               sachet: cleanSachet
            }
         }
      })
      closeSachetTunnel(1)
      setSachetForm({
         id: '',
         quantity: { value: '', unit: '' },
         tracking: true,
         modes: [
            {
               isActive: false,
               type: 'Real Time',
               station: '',
               supplierItems: [
                  {
                     item: '',
                     accuracy: 0,
                     packaging: '',
                     isLabelled: false,
                     labelTemplate: ''
                  }
               ]
            },
            {
               isActive: false,
               type: 'Co-Packer',
               station: '',
               supplierItems: [
                  {
                     item: '',
                     accuracy: 0,
                     packaging: '',
                     isLabelled: false,
                     labelTemplate: ''
                  }
               ]
            },
            {
               isActive: false,
               type: 'Planned Lot',
               station: '',
               supplierItems: [
                  {
                     item: '',
                     accuracy: 0,
                     packaging: '',
                     isLabelled: false,
                     labelTemplate: ''
                  }
               ]
            }
         ]
      })
   }

   // Mode Ops
   const toggleMode = (val, type) => {
      let index = sachetForm.modes.findIndex(mode => mode.type === type)
      const copySachetForm = sachetForm
      copySachetForm.modes[index].isActive = !sachetForm.modes[index].isActive
      setSachetForm({ ...copySachetForm })
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
      selectStation('id', station.id)
      openSachetTunnel(3)
   }
   const selectSupplierItemHandler = item => {
      selectSupplierItem('id', item.id)
      let copyModeForm = modeForm
      copyModeForm.supplierItems[0].item = item
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
         supplierItems: [
            {
               item: '',
               accuracy: 0,
               packaging: '',
               isLabelled: false,
               labelTemplate: ''
            }
         ]
      })
   }

   const sachetTunnelHandler = () => {
      fetchUnits()
      fetchStations()
      fetchSupplierItems()
      fetchPackagings()
      fetchLabelTemplates()
      openSachetTunnel(1)
   }

   return (
      <StyledSection spacing='md' hasElements={sachets.length !== 0}>
         {sachets.length > 0 ? (
            <>
               <StyledListing>
                  <StyledListingHeader>
                     <h3>Sachets ({sachets.length})</h3>
                     <span>
                        <AddIcon
                           color='#555B6E'
                           size='18'
                           stroke='2.5'
                           onClick={sachetTunnelHandler}
                        />
                     </span>
                  </StyledListingHeader>
                  {sachets.map((sachet, i) => (
                     <StyledListingTile
                        key={sachet.id}
                        active={i === selectedIndex}
                        onClick={() => setSelectedIndex(i)}
                     >
                        <Actions active={i === selectedIndex}>
                           <span onClick={() => deleteSachetHandler(sachet.id)}>
                              <DeleteIcon />
                           </span>
                        </Actions>
                        <h3>
                           {sachet.quantity.value} {sachet.quantity.unit.title}
                        </h3>
                        <p>Active: Real-time</p>
                        <p>Available: 12/40 pkt</p>
                     </StyledListingTile>
                  ))}
                  <ButtonTile
                     type='primary'
                     size='lg'
                     onClick={sachetTunnelHandler}
                  />
               </StyledListing>
               <StyledDisplay contains='sachets' hasElements={true}>
                  <StyledTabsContainer>
                     <StyledTab
                        className={selectedView === 'modes' ? 'active' : ''}
                        onClick={() => setSelectedView('modes')}
                     >
                        Modes of fulfillment
                     </StyledTab>
                     <StyledTab
                        className={selectedView === 'inventory' ? 'active' : ''}
                        onClick={() => setSelectedView('inventory')}
                     >
                        Inventory
                     </StyledTab>
                  </StyledTabsContainer>
                  <StyledTabContent
                     className={selectedView === 'modes' ? 'active' : ''}
                  >
                     <Sachet sachet={sachets[selectedIndex]} />
                  </StyledTabContent>
                  <StyledTabContent
                     className={selectedView === 'inventory' ? 'active' : ''}
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
               onClick={sachetTunnelHandler}
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
                     <h1>Add Sachet for Processing: {processingName}</h1>
                  </div>
                  <TextButton type='solid' onClick={createSachetHandler}>
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
                           <option key={unit.id} value={unit.id}>
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
                           <th>Accuracy</th>
                           <th>Packaging</th>
                           <th>Label</th>
                        </tr>
                     </thead>
                     <tbody>
                        {sachetForm.modes.map(mode => (
                           <tr
                              key={mode.type}
                              onClick={() => setCurrentMode(mode.type)}
                           >
                              <td>
                                 <Checkbox
                                    checked={mode.isActive}
                                    onChange={val => toggleMode(val, mode.type)}
                                 />
                                 {mode.type}
                              </td>
                              <td>
                                 {mode.station?.title?.length > 0
                                    ? mode.station.title
                                    : '-'}
                              </td>
                              <td>
                                 {mode.supplierItems[0].item?.title?.length > 0
                                    ? mode.supplierItems[0].item.title
                                    : '-'}
                              </td>
                              <td>
                                 {mode.supplierItems[0].item?.title?.length >
                                 0 ? (
                                    <RadioGroup
                                       options={accuracyOptions}
                                       active={3}
                                       onChange={option =>
                                          selectAccuracyHandler(option.value)
                                       }
                                    />
                                 ) : (
                                    '-'
                                 )}
                              </td>
                              <td>
                                 {mode.supplierItems[0].item?.title?.length >
                                 0 ? (
                                    <>
                                       {mode.supplierItems[0].packaging
                                          ?.title ? (
                                          <Tag
                                             onClick={() =>
                                                openPackagingTunnel(1)
                                             }
                                          >
                                             {
                                                mode.supplierItems[0].packaging
                                                   .title
                                             }
                                          </Tag>
                                       ) : (
                                          <ButtonTile
                                             type='secondary'
                                             text='Packaging'
                                             onClick={() =>
                                                openPackagingTunnel(1)
                                             }
                                          />
                                       )}
                                    </>
                                 ) : (
                                    '-'
                                 )}
                              </td>
                              <td>
                                 {mode.supplierItems[0].item?.title?.length >
                                 0 ? (
                                    <React.Fragment>
                                       <Toggle
                                          checked={
                                             mode.supplierItems[0].isLabelled
                                          }
                                          setChecked={val =>
                                             toggleIsLabelled(val)
                                          }
                                       />
                                       {mode.supplierItems[0].isLabelled && (
                                          <>
                                             {mode.supplierItems[0]
                                                .labelTemplate?.title ? (
                                                <Tag
                                                   onClick={() =>
                                                      openLabelTunnel(1)
                                                   }
                                                >
                                                   {
                                                      mode.supplierItems[0]
                                                         .labelTemplate.title
                                                   }
                                                </Tag>
                                             ) : (
                                                <ButtonTile
                                                   noIcon
                                                   type='secondary'
                                                   text='Select Sub Title'
                                                   onClick={() =>
                                                      openLabelTunnel(1)
                                                   }
                                                />
                                             )}
                                          </>
                                       )}
                                    </React.Fragment>
                                 ) : (
                                    '-'
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
                     <h1>Select station for: {modeForm?.type}</h1>
                  </div>
               </StyledTunnelHeader>
               <StyledTunnelMain>
                  <List>
                     {Object.keys(currentStation).length > 0 ? (
                        <ListItem type='SSL1' title={currentStation.title} />
                     ) : (
                        <ListSearch
                           onChange={value => setSearch(value)}
                           placeholder='type what you’re looking for...'
                        />
                     )}
                     <ListOptions>
                        {stationsList
                           .filter(option =>
                              option.title.toLowerCase().includes(search)
                           )
                           .map(option => (
                              <ListItem
                                 type='SSL1'
                                 key={option.id}
                                 title={option.title}
                                 isActive={option.id === currentStation.id}
                                 onClick={() => selectStationHandler(option)}
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
                        Select Supplier items for: {modeForm?.station.title}
                     </h1>
                  </div>
               </StyledTunnelHeader>
               <StyledTunnelMain>
                  <List>
                     {Object.keys(currentSupplierItem).length > 0 ? (
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
                              option.title.toLowerCase().includes(search)
                           )
                           .map(option => (
                              <ListItem
                                 type='SSL1'
                                 key={option.id}
                                 title={option.title}
                                 isActive={option.id === currentSupplierItem.id}
                                 onClick={() =>
                                    selectSupplierItemHandler(option)
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
                     <h1>Add Packaging for Processing: {processingName}</h1>
                  </div>
               </StyledTunnelHeader>
               <StyledTunnelMain>
                  <List>
                     {Object.keys(currentPackaging).length > 0 ? (
                        <ListItem type='SSL1' title={currentPackaging.title} />
                     ) : (
                        <ListSearch
                           onChange={value => setSearch(value)}
                           placeholder='type what you’re looking for...'
                        />
                     )}
                     <ListOptions>
                        {packagingList
                           .filter(option =>
                              option.title.toLowerCase().includes(search)
                           )
                           .map(option => (
                              <ListItem
                                 type='SSL1'
                                 key={option.id}
                                 title={option.title}
                                 isActive={option.id === currentPackaging.id}
                                 onClick={() => selectPackagingHandler(option)}
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
                        Add Label Template for Processing: {processingName}
                     </h1>
                  </div>
               </StyledTunnelHeader>
               <StyledTunnelMain>
                  <List>
                     {Object.keys(currentLabelTemplate).length > 0 ? (
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
                              option.title.toLowerCase().includes(search)
                           )
                           .map(option => (
                              <ListItem
                                 type='SSL1'
                                 key={option.id}
                                 title={option.title}
                                 isActive={
                                    option.id === currentLabelTemplate.id
                                 }
                                 onClick={() =>
                                    selectLabelTemplateHandler(option)
                                 }
                              />
                           ))}
                     </ListOptions>
                  </List>
               </StyledTunnelMain>
            </Tunnel>
         </Tunnels>
      </StyledSection>
   )
}

export default Sachets
