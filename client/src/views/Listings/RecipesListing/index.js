import React from 'react'
import { IconButton } from '@dailykit/ui'

// Icons
import { AddIcon } from '../../../assets/icons';

// State
import { Context } from '../../../store/tabs'

// Styled
import { StyledWrapper, StyledTableHeader, StyledTableActions, StyledHeader } from '../styled'

const RecipesListing = () => {
   const { dispatch } = React.useContext(Context)
   const addTab = (title, view) => {
      dispatch({ type: 'ADD_TAB', payload: { type: 'forms', title, view } })
   }
   return (
      <StyledWrapper>
         <StyledHeader>
            <h1>Recipes</h1>
            <p> pagination </p>
         </StyledHeader>
         <StyledTableHeader>
            <p>filters</p>
            <StyledTableActions>
               <IconButton
                  type="solid"
                  onClick={() => addTab('Untitled Recipe', 'recipe')}
               >
                  <AddIcon color="#fff" size={24} />
               </IconButton>
            </StyledTableActions>
         </StyledTableHeader>
      </StyledWrapper>
   )
}

export default RecipesListing;