import { gql } from 'apollo-boost'

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

export const PROCESSINGS = gql`
   query Processings($ingredientId: ID!) {
      processings(ingredientId: $ingredientId) {
         _id
         sachets
         name {
            title
         }
         recipes
      }
   }
`

export const SACHETS = gql`
   query Sachets($processingId: ID!) {
      sachets(processingId: $processingId) {
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
