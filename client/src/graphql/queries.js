import { gql } from 'apollo-boost'

export const INGREDIENT = gql`
   query Ingredient($ID: ID!) {
      ingredient(id: $ID) {
         _id
         name
         image
         processings {
            _id
            sachets {
               _id
               quantity {
                  value
                  unit
               }
            }
            name {
               title
            }
            recipes
         }
         sachets
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
