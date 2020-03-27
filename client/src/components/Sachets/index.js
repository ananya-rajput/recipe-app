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
   RadioGroup
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
   SACHETS,
   FETCH_UNITS,
   FETCH_SUPPLIER_ITEMS,
   FETCH_STATIONS,
   FETCH_PACKAGINGS,
   FETCH_LABEL_TEMPLATES,
   ADD_SACHET,
   DELETE_SACHET
} from '../../graphql'

const Sachets = ({ ingredientId, processingId, processingName }) => {
   // State
   const [sachets, setSachets] = React.useState([])
   const [selectedIndex, setSelectedIndex] = React.useState(0)
   const [units, setUnits] = React.useState([])
   const [selectedView, setSelectedView] = React.useState('modes')
   const [search, setSearch] = React.useState('')

   // Queries and Mutations
   const [fetchSachets, {}] = useLazyQuery(SACHETS, {
      onCompleted: data => {
         setSachets(data.sachets)
      }
   })
   const [fetchUnits, {}] = useLazyQuery(FETCH_UNITS, {
      onCompleted: data => {
         setUnits(data.units)
         openSachetTunnel(1)
      }
   })
   const [fetchStations, {}] = useLazyQuery(FETCH_STATIONS, {
      onCompleted: data => {
         stationsList.length = 0
         stationsList.push(...data.stations)
         openSachetTunnel(2)
      }
   })
   const [fetchSupplierItems, {}] = useLazyQuery(FETCH_SUPPLIER_ITEMS, {
      onCompleted: data => {
         supplierItemsList.length = 0
         supplierItemsList.push(...data.supplierItems)
         openSachetTunnel(3)
      }
   })
   const [fetchPackagings, {}] = useLazyQuery(FETCH_PACKAGINGS, {
      onCompleted: data => {
         packagingList.length = 0
         packagingList.push(...data.packagings)
         openPackagingTunnel(1)
      }
   })
   const [fetchLabelTemplates, {}] = useLazyQuery(FETCH_LABEL_TEMPLATES, {
      onCompleted: data => {
         labelTemplateList.length = 0
         labelTemplateList.push(...data.labelTemplates)
         openLabelTunnel(1)
      }
   })
   const [addSachet] = useMutation(ADD_SACHET, {
      onCompleted: data => {
         console.log(data.addSachet)
         setSachets(data.addSachet)
      }
   })
   const [deleteSachet] = useMutation(DELETE_SACHET, {
      onCompleted: data => {
         const updatedSachets = sachets.filter(
            sachet => sachet._id !== data.deleteSachet.ID
         )
         setSachets(updatedSachets)
         if (updatedSachets.length) setSelectedIndex(selectedIndex - 1)
         else setSelectedIndex(0)
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

   // Tunnels
   const [sachetTunnel, openSachetTunnel, closeSachetTunnel] = useTunnel(3)
   const [currentMode, setCurrentMode] = React.useState('')
   const [sachetForm, setSachetForm] = React.useState({
      _id: '',
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

   const selectAccuracyHandler = value => {
      let copySachetForm = sachetForm
      const index = copySachetForm.modes.findIndex(
         mode => mode.type === currentMode
      )
      copySachetForm.modes[index].supplierItems[0].accuracy = value
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
      copySachetForm.modes[index].supplierItems[0].packaging = packaging
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
            const cleanSupplierItems = mode.supplierItems.map(supplierItem => {
               return {
                  item: supplierItem.item._id,
                  accuracy: supplierItem.accuracy,
                  packaging: supplierItem.packaging._id,
                  isLabelled: supplierItem.isLabelled,
                  labelTemplate: supplierItem.labelTemplate._id
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
      addSachet({
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
         _id: '',
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
            fetchStations()
         }
      }
   }
   const selectStationHandler = station => {
      setModeForm({ ...modeForm, station })
      selectStation('_id', station._id)
      fetchSupplierItems()
   }
   const selectSupplierItemHandler = item => {
      selectSupplierItem('_id', item._id)
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
                           onClick={fetchUnits}
                        />
                     </span>
                  </StyledListingHeader>
                  {sachets.map((sachet, i) => (
                     <StyledListingTile
                        key={sachet._id}
                        active={i === selectedIndex}
                        onClick={() => setSelectedIndex(i)}
                     >
                        <Actions active={i === selectedIndex}>
                           <span
                              onClick={() => deleteSachetHandler(sachet._id)}
                           >
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
                  <ButtonTile type='primary' size='lg' onClick={fetchUnits} />
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
                  ></StyledTabContent>
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
               onClick={fetchUnits}
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
                  <TextButton type='solid' onClick={addSachetHandler}>
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
                           <option key={unit._id} value={unit._id}>
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
                              onClick={() => setCurrentMode(mode.type)}
                           >
                              <td>
                                 <Checkbox
                                    checked={mode.isActive}
                                    onChange={val => toggleMode(val, mode.type)}
                                 />
                                 {mode.type}
                              </td>
                              <td>{mode.station.title}</td>
                              <td>{mode.supplierItems[0].item.title}</td>
                              <td>
                                 <RadioGroup
                                    options={accuracyOptions}
                                    active={2}
                                    onChange={option =>
                                       selectAccuracyHandler(option.value)
                                    }
                                 />
                              </td>
                              <td>
                                 <ButtonTile
                                    type='secondary'
                                    text='Packaging'
                                    onClick={fetchPackagings}
                                 />
                              </td>
                              <td>
                                 <Toggle
                                    checked={mode.supplierItems[0].isLabelled}
                                    setChecked={val => toggleIsLabelled(val)}
                                 />
                                 {mode.supplierItems[0].isLabelled && (
                                    <ButtonTile
                                       noIcon
                                       type='secondary'
                                       text='Select Sub Title'
                                       onClick={fetchLabelTemplates}
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
                                 key={option._id}
                                 title={option.title}
                                 isActive={option._id === currentStation._id}
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
                                 key={option._id}
                                 title={option.title}
                                 isActive={
                                    option._id === currentSupplierItem._id
                                 }
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
                                 key={option._id}
                                 title={option.title}
                                 isActive={option._id === currentPackaging._id}
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
                                 key={option._id}
                                 title={option.title}
                                 isActive={
                                    option._id === currentLabelTemplate._id
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
