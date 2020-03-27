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
import {
   PROCESSINGS,
   ADD_PROCESSINGS,
   DELETE_PROCESSING,
   FETCH_PROCESSING_NAMES
} from '../../graphql'
import { Sachets } from '../'

const Processings = ({ ingredientId }) => {
   // States
   const [processings, setProcessings] = React.useState([])
   const [selectedIndex, setSelectedIndex] = React.useState(0)

   // Queries and Mutations
   const [fetchProcessingNames, {}] = useLazyQuery(FETCH_PROCESSING_NAMES, {
      onCompleted: data => {
         processingNamesList.length = 0
         processingNamesList.push(...data.processingNames)
      }
   })
   const [fetchProcessings, {}] = useLazyQuery(PROCESSINGS, {
      onCompleted: data => {
         setProcessings(data.processings)
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

   // Side Effects
   React.useEffect(() => {
      if (ingredientId.length) {
         fetchProcessings({
            variables: { ingredientId }
         })
         fetchProcessingNames()
      }
   }, [ingredientId])

   //Lists
   const [
      processingNamesList,
      selectedProcessingNames,
      selectProcessingName
   ] = useMultiList([])

   // Tunnels
   const [
      processingTunnel,
      openProcessingTunnel,
      closeProcessingTunnel
   ] = useTunnel(1)
   const [search, setSearch] = React.useState('')

   // Handlers
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
               processings.map((processing, i) => (
                  <StyledListingTile
                     key={processing._id}
                     active={i === selectedIndex}
                     onClick={() => setSelectedIndex(i)}
                  >
                     <Actions active={i === selectedIndex}>
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
            <Sachets
               ingredientId={ingredientId}
               processingId={processings[selectedIndex]?._id}
               processingName={processings[selectedIndex]?.name.title}
            />
         </StyledDisplay>
      </StyledSection>
   )
}

export default Processings
