import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
   ButtonTile,
   Tunnels,
   Tunnel,
   useTunnel,
   TextButton,
   List,
   ListOptions,
   ListSearch,
   TagGroup,
   Tag,
   ListItem,
   useMultiList
} from '@dailykit/ui'

import { AddIcon, DeleteIcon, CloseIcon } from '../../assets/icons'
import {
   StyledSection,
   StyledListing,
   StyledListingHeader,
   StyledListingTile,
   StyledDisplay,
   Actions,
   StyledTunnelHeader,
   StyledTunnelMain
} from '../styled'
import { ADD_PROCESSINGS, DELETE_PROCESSING } from '../../graphql'
import Sachets from '../Sachets'

const Processings = ({ ingredientId, data }) => {
   const [processings, setProcessings] = React.useState(data)
   const [sachets, setSachets] = React.useState([])

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

   //Lists
   const [
      processingNamesList,
      selectedProcessingNames,
      selectProcessingName
   ] = useMultiList([])

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
         variables: { ingredientId, processingNames: names }
      })
      closeProcessingTunnel(1)
   }

   const deleteProcessingHandler = processingId => {
      deleteProcessing({
         variables: {
            input: {
               ingredientId,
               processingId
            }
         }
      })
   }

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

   return (
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
                     onClick={() => setSelectedProcessingID(processing._id)}
                  >
                     <Actions active={processing._id === selectedProcessingID}>
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
                     <TextButton type='solid' onClick={addProcessingsHandler}>
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
                                       selectProcessingName('_id', option._id)
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
                                 option.title.toLowerCase().includes(search)
                              )
                              .map(option => (
                                 <ListItem
                                    type='MSL1'
                                    key={option._id}
                                    title={option.title}
                                    onClick={() =>
                                       selectProcessingName('_id', option._id)
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
            <Sachets processingId={'currentProcessingid'} data={[]} />
         </StyledDisplay>
      </StyledSection>
   )
}

export default Processings
