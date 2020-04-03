import React from 'react'

export const Context = React.createContext()

export const state = {
   name: '',
   recipeType: { id: 2, title: 'Non-Vegetarian' },
   servings: [{ id: 1, value: 1 }],
   ingredients: [],
   sachets: [],
   steps: [
      {
         title: '',
         description: '',
         photos: [{ caption: '', imageUrl: '' }]
      }
   ],
   view: {},
   activeServing: {},
   pushableState: {
      type: 'Non-Vegetarian',
      servings: [{ size: 1, ingredients: [] }]
   }
}

export const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'RECIPE_NAME_CHANGE':
         return {
            ...state,
            name: payload.name,
            pushableState: { ...state.pushableState, name: payload.name }
         }

      case 'CHANGE_RECIPE_TYPE':
         return {
            ...state,
            recipeType: payload,
            pushableState: { ...state.pushableState, type: payload.title }
         }

      case 'ADD_SERVING':
         const id = state.servings[state.servings.length - 1].id + 1
         return {
            ...state,
            servings: [...state.servings, { id, value: 1 }]
         }

      case 'REMOVE_SERVING':
         const servingIndexToRemove = state.servings.findIndex(
            serving =>
               serving.id === payload.id && serving.value === payload.value
         )

         const newServings = [...state.servings]
         newServings.splice(servingIndexToRemove, 1)

         if (newServings.length === 0) newServings.push({ id: 1, value: 1 })

         const forPushableState = newServings.map(serving => {
            return {
               size: parseInt(serving.value),
               ingredients: state.ingredients
            }
         })

         return {
            ...state,
            servings: newServings,
            pushableState: {
               ...state.pushableState,
               servings: forPushableState
            }
         }

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
         const existingSachet = state.sachets.find(
            sachet =>
               sachet.ingredient.id === state.view.id &&
               sachet.serving.id === state.activeServing.id
         )

         if (existingSachet) {
            const newState = { ...state }
            newState.sachets.splice(state.sachets.indexOf(existingSachet), 1, {
               ...payload.sachet,
               ingredient: state.view,
               serving: state.activeServing
            })

            return newState
         } else {
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
         }

      case 'DELETE_INGREDIENT':
         const newState = { ...state }
         const sachetsBelongingToIngredient = newState.sachets.filter(
            sachet => sachet.ingredient.id === payload.id
         )

         sachetsBelongingToIngredient.forEach(sachet =>
            newState.sachets.splice(newState.sachets.indexOf(sachet), 1)
         )

         newState.ingredients.splice(newState.ingredients.indexOf(payload), 1)

         return {
            ...newState,
            activeServing: {},
            view: {}
         }

      case 'EDIT_COOOKING_PROCESS':
         const newStepsForEditing = [...state.steps]
         newStepsForEditing[payload.index][payload.name] = payload.value
         return { ...state, steps: newStepsForEditing }

      case 'CREATE_COOKING_PROCESS':
         const newStepsForCreating = [...state.steps]
         newStepsForCreating.push({
            title: '',
            description: '',
            photos: [{ caption: '', imageUrl: '' }]
         })
         return { ...state, steps: newStepsForCreating }

      case 'DELETE_COOKING_PROCESS':
         const newStepsForDeleting = [...state.steps]
         newStepsForDeleting.splice(payload.index, 1)
         return { ...state, steps: newStepsForDeleting }

      case 'ADD_SERVINGS_FOR_PUSHABLE':
         const pushableServings = state.servings.map(serving => {
            return {
               size: parseInt(serving.value),
               ingredients: state.ingredients
            }
         })
         return {
            ...state,
            pushableState: {
               ...state.pushableState,
               servings: pushableServings
            }
         }
      case 'ADD_INGREDIENTS_FOR_PUSHABLE':
         const ingredients = payload.map(ingredient => {
            return { ingredient: ingredient.id }
         })
         const servingsWithIngredients = state.pushableState.servings.map(
            serving => {
               return { ...serving, ingredients }
            }
         )
         return {
            ...state,
            pushableState: {
               ...state.pushableState,
               servings: servingsWithIngredients
            }
         }

      case 'ADD_PROCESSING_FOR_PUSHABLE':
         const ingsWithProcessing = state.ingredients(ingredient => {
            return { ingredient: ingredient.id, processing: payload.id }
         })

         const servingsWithProcessing = state.pushableState.servings.map(
            serving => {
               return { ...serving, ingredients: ingsWithProcessing }
            }
         )
         return {
            ...state,
            psuhableState: {
               ...state.pushableState,
               servings: servingsWithProcessing
            }
         }
      case 'ADD_SACHET_FOR_PUSHABLE':
         const newPushableServings = [...state.pushableState.servings]
         const indexForServing = newPushableServings.findIndex(
            serving => serving.size === state.activeServing.value
         )

         const ings = newPushableServings[indexForServing].ingredients.map(
            ing => {
               return {
                  ...ing,
                  sachet: payload.id
               }
            }
         )

         newPushableServings[indexForServing].ingredients = ings

         return {
            ...state,
            psuhableState: {
               ...state.pushableState,
               servings: newPushableServings
            }
         }

      case 'POPULATE_PUSHABLE':
         return {
            ...state,
            pushableState: {
               ...state.pushableState,
               id: payload.id,
               name: payload.name
            }
         }
      default:
         return state
   }
}
