import { gql } from 'apollo-boost'

export const UPDATE_INGREDIENT = gql`
   mutation UpdateIngredient(
      $ingredientId: ID!
      $name: String!
      $image: String
   ) {
      updateIngredient(
         input: { ingredientId: $ingredientId, name: $name, image: $image }
      ) {
         _id
         name
         image
      }
   }
`

export const ADD_PROCESSINGS = gql`
   mutation AddProcessings($ingredientId: ID!, $processingNames: [ID!]!) {
      addProcessings(
         input: {
            ingredientId: $ingredientId
            processingNames: $processingNames
         }
      ) {
         _id
         sachets
         name {
            title
         }
         recipes
      }
   }
`

export const DELETE_PROCESSING = gql`
   mutation DeleteProcessing($input: DeleteProcessingInput) {
      deleteProcessing(input: $input) {
         success
         message
         ID
      }
   }
`

export const ADD_SACHET = gql`
   mutation AddSachet($input: AddSachetInput!) {
      addSachet(input: $input) {
         _id
         quantity {
            value
            unit {
               _id
               title
            }
         }
         tracking
         modes {
            isActive
            type
            station {
               _id
               title
            }
            supplierItems {
               isDefault
               item {
                  _id
                  title
               }
               accuracy
               packaging {
                  _id
                  title
               }
               isLabelled
               labelTemplate {
                  _id
                  title
               }
            }
         }
      }
   }
`

export const DELETE_SACHET = gql`
   mutation DeleteSachet($input: DeleteSachetInput!) {
      deleteSachet(input: $input) {
         success
         message
         ID
      }
   }
`
