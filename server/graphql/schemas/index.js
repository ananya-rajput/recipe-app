const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    # ---------- Scalars ----------

    type Ingredient {
        _id: ID! 
        isValid: Boolean!
        name: String!
        image: String
        processings: [Processing!]!
    }

    type Processing {
        _id: ID!
        isValid: Boolean!
        type: ProcessingName!
        sachets: [Sachet!]!
    }

    type ProcessingName {
        _id: ID!
        title: String!
    }

    type Sachet {
        _id: ID!
        isValid: Boolean!
        quantity: Quantity!
        tracking: Boolean!
        modes: [Mode!]!
    }

    type Quantity {
        value: Int!
        unit: String!
    }

    type Mode {
        isActive: Boolean!
        priority: Int!
        type: String!
        station: StationName!
        supplierItems: [SupplierItem!]!
        isWeighable: Boolean!
        accuracy: Int
        packaging: PackagingType!
        isLabelled: Boolean!
        labelTemplate: LabelTemplate
    }

    type StationName {
        _id: ID!
        name: String!
    }

    type SupplierItem {
        _id: ID!
        name: String!
    }

    type PackagingType {
        _id: ID!
        name: String!
    }

    type LabelTemplate {
        _id: ID!
        name: String!
    }

    
    # ---------- Queries ----------

    type RootQuery {
        ingredients: [Ingredient!]!
        ingredient(id: ID!): Ingredient
        processingNames: [ProcessingName!]!
    }


    # ---------- Mutations ----------

    input IngredientInput {
        name: String!
    }

    type RootMutation {
        createIngredient(input: IngredientInput): Ingredient!
    }


    # ---------- Schema ----------
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);