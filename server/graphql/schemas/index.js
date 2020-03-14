const { buildSchema } = require('graphql')

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
        name: ProcessingName!
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

    type Unit {
        _id : ID!
        title : String!
    }

    type Mode {
        isActive: Boolean!
        type: String!
        station: Station!
        supplierItems: [SupplierItem!]!
    }

    type Station {
        _id: ID!
        title: String!
    }

    type SupplierItem {
        type: Item!
        isWeighable: Boolean!
        accuracy: Int
        packaging: PackagingType!
        isLabelled: Boolean!
        labelTemplate: LabelTemplate
    }

    type Item {
        _id: ID!
        title: String!
    }

    type PackagingType {
        _id: ID!
        name: String!
    }

    type LabelTemplate {
        _id: ID!
        name: String!
    }

    type Response {
        success: Boolean!
        message: String!
        ID: ID
    }

    
    # ---------- Queries ----------

    type RootQuery {
        ingredients: [Ingredient!]!
        ingredient(id: ID!): Ingredient!
        processingNames: [ProcessingName!]!
        stations: [Station!]!
        supplierItems: [Item!]!
        units: [Unit!]!
    }


    # ---------- Mutations ----------

    input IngredientInput {
        name: String!
    }

    input UpdateIngredientInput {
        ingredientId : ID!
        name: String!
        image: String
    }

    input AddProcessingsInput {
        ingredientId: ID!
        processingNames: [ID!]!
    }

    input AddSachetInput {
        ingredientId: ID!
        processingId: ID!
        sachet: SachetInput!
    }

    input SachetInput {
        quantity: QuantityInput!
        tracking: Boolean!
        modes: [ModeInput!]!
    }

    input QuantityInput {
        value: Int!
        unit: ID!
    }

    input ModeInput {
        isActive: Boolean!
        type: String!
        station: ID!
        supplierItems: [SupplierItemInput!]!
    }

    input SupplierItemInput {
        item: ID!
        isWeighable: Boolean
        accuracy: Int
        packaging: ID!
        isLabelled: Boolean!
        labelTemplate: ID
    }

    input DeleteProcessingInput {
        ingredientId: ID!
        processingId: ID!
    }

    type RootMutation {
        createIngredient(input: IngredientInput): Ingredient!
        updateIngredient(input: UpdateIngredientInput): Ingredient!
        addProcessings(input: AddProcessingsInput): Ingredient!
        deleteProcessing(input: DeleteProcessingInput): Response!
        addSachet(input: AddSachetInput): Ingredient!
    }


    # ---------- Schema ----------
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)
