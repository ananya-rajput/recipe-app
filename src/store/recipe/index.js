import React from 'react'

export const Context = React.createContext()

export const state = {
   view: {},
   activeServing: {}
}

export const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'SET_VIEW':
         return { ...state, view: payload }

      case 'SET_ACTIVE_SERVING':
         return { ...state, activeServing: payload }

      default:
         return state
   }
}
