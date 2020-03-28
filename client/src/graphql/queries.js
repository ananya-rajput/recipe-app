import { gql } from 'apollo-boost'

export const INGREDIENTS = gql`
   {
      ingredients {
         _id
         name
      }
   }
`

export const INGREDIENT = gql`
   query Ingredient($ID: ID!) {
      ingredient(id: $ID) {
         _id
         name
         image
         processings
         sachets
      }
   }
`

export const PROCESSINGS_OF_INGREDIENT = gql`
   query ProcessingsOfIngredient($ingredientId: ID!) {
      processingsOfIngredient(id: $ingredientId) {
         _id
         sachets
         name {
            title
         }
         recipes
      }
   }
`

export const SACHETS_OF_PROCESSING = gql`
   query SachetsOfProcessing($processingId: ID!) {
      sachetsOfProcessing(id: $processingId) {
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

export const FETCH_PROCESSING_NAMES = gql`
   {
      processingNames {
         _id
         title
      }
   }
`

export const FETCH_UNITS = gql`
   {
      units {
         _id
         title
      }
   }
`

export const FETCH_STATIONS = gql`
   {
      stations {
         _id
         title
      }
   }
`

export const FETCH_SUPPLIER_ITEMS = gql`
   {
      supplierItems {
         _id
         title
      }
   }
`

export const FETCH_PACKAGINGS = gql`
   {
      packagings {
         _id
         title
      }
   }
`

export const FETCH_LABEL_TEMPLATES = gql`
   {
      labelTemplates {
         _id
         title
      }
   }
`
