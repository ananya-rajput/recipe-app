import { gql } from 'apollo-boost'

export const CREATE_INGREDIENT = gql`
   mutation CreateIngredient($name: String) {
      createIngredient(name: $name) {
         _id
         name
      }
   }
`

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

export const CREATE_PROCESSINGS = gql`
   mutation CreateProcessings($ingredientId: ID!, $processingNames: [ID!]!) {
      createProcessings(
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

export const CREATE_SACHET = gql`
   mutation CreateSachet($input: CreateSachetInput!) {
      createSachet(input: $input) {
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
