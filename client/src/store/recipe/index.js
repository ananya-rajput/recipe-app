import React from 'react'

const Context = React.createContext()

const state = {
   name: '',
   recipeType: { id: 2, title: 'Non-Vegetarian' },
   servings: [{ id: 1, value: 0 }],
   ingredients: [],
   sachets: [],
   view: {},
   activeServing: {}
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

      case 'REMOVE_SERVING':
         const servingIndexToRemove = state.servings.findIndex(
            serving =>
               serving.id === payload.id && serving.value === payload.value
         )

         const newServings = [...state.servings]
         newServings.splice(servingIndexToRemove, 1)

         if (newServings.length === 0) newServings.push({ id: 1, value: 0 })

         return { ...state, servings: newServings }

      case 'CHANGE_SERVINGS':
         const servingId = payload.id

         const match = state.servings.find(serving => serving.id === servingId)
         const index = state.servings.findIndex(
            serving => serving.id === servingId
         )
         match.value = payload.value
         const updatedServings = [...state.servings]
         updatedServings[index] = match
         return { ...state }
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

      case 'ADD_PROCESSING':
         const currentIngredient = state.ingredients.find(
            ing => ing.id === payload.ingredient.id
         )
         currentIngredient.processing = payload.processing
         state.ingredients.splice(
            state.ingredients.indexOf(state.view),
            1,
            currentIngredient
         )
         return state

      case 'SET_ACTIVE_SERVING':
         return { ...state, activeServing: payload }
      case 'ADD_SACHET':
         //TODO: bug: not push in the sachets as it will result in many sachets
         return {
            ...state,
            sachets: [
               ...state.sachets,
               {
                  ...payload.sachet,
                  ingredient: state.view,
                  serving: state.activeServing
               }
            ]
         }
      default:
         return state
   }
}

export { Context, state, reducers }
