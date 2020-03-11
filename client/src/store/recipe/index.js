import React from 'react'

const Context = React.createContext()

const state = {
   name: '',
   recipeType: { id: 2, title: 'Non-Vegetarian' },
   servings: [{ id: 1, value: 0 }],
   ingredients: [],
   view: {}
}

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'RECIPE_NAME_CHANGE':
         return { ...state, name: payload.name }

      case 'CHANGE_RECIPE_STATE':
         return { ...state, recipeType: payload }

      case 'ADD_SERVING':
         const id = state.servings[state.servings.length - 1].id + 1
         return { ...state, servings: [...state.servings, { id, value: 0 }] }

      case 'CHANGE_SERVINGS':
         const { index } = payload
         const match = state.servings[index]
         match.value = payload.value
         const updatedServings = [...state.servings]
         updatedServings[index] = match
         return { ...state, servings: updatedServings }

      case 'ADD_INGREDIENTS':
         return { ...state, ingredients: [...payload] }

      case 'REFINE_SERVINGS':
         if (state.servings.length === 1) return state
         if (state.servings[state.servings.length - 1].value === 0) {
            const newServings = [...state.servings]
            newServings.pop()
            return { ...state, servings: newServings }
         }
         return state

      case 'SET_VIEW':
         return { ...state, view: payload }

      default:
         return state
   }
}

export { Context, state, reducers }
