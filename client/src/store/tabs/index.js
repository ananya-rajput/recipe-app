import React from 'react'

const Context = React.createContext()

const state = {
   listings: [],
   forms: [],
   current: {},
}

const reducers = (state, { type, payload }) => {
   switch (type) {
      // Add Tab
      case 'ADD_TAB': {
         const alreadyExists = state[payload.type].find(
            tab => tab.title === payload.title
         )

         if (alreadyExists) {
            return { ...state, current: { ...payload } }
         } else {
            return {
               ...state,
               current: { ...payload },
               [payload.type]: [...state[payload.type], { ...payload }],
            }
         }
      }
      // Delete Tab
      case 'DELETE_TAB': {
         const type = payload.type
         const tabs = state[type].filter(
            (tab, index) =>
               tab.title !== payload.title && index !== payload.index
         )

         const listingsLength = state.listings.length
         const formsLength = state.forms.length

         if (type === 'listings' && listingsLength > 1) {
            state.current =
               payload.index > 0
                  ? { ...state[type][payload.index - 1] }
                  : { ...state[type][payload.index + 1] }
         }

         if (type === 'listings' && listingsLength === 1 && formsLength > 1) {
            state.current = { ...state.forms[0] }
         }

         if (type === 'forms' && formsLength > 1) {
            state.current =
               payload.index > 0
                  ? { ...state[type][payload.index - 1] }
                  : { ...state[type][payload.index + 1] }
         }

         if (type === 'forms' && formsLength === 1 && listingsLength > 1) {
            state.current = { ...state.listings[listingsLength - 1] }
         }

         return { ...state, [type]: tabs }
      }
      // Switch Tab
      case 'SWITCH_TAB': {
         return { ...state, current: { ...payload } }
      }
      default:
         return state
   }
}

export { Context, state, reducers }