const { buildSchema } = require('graphql')

module.exports = buildSchema(`

    # ---------- Scalars ----------

    type Ingredient {
        _id: ID! 
        isValid: Boolean!
        isPublished: Boolean!
        name: String!
        image: String
        processings: [ID!]!
        # Returning ID rn, as we only need length
        sachets: [ID!]!
    }

    type Processing {
        _id: ID!
        isValid: Boolean!
        name: ProcessingName!
        sachets: [ID!]!
        # Returning ID rn, as we only need length
        recipes: [ID!]!
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
        unit: Unit!
    }

    type Unit {
        _id : ID!
        title : String!
    }

    type Mode {
        isActive: Boolean!
        type: String!
        station: Station!
        supplierItems: [SupplierItem]!
    }

    type SupplierItem {
        isDefault: Boolean!
        item: Item!
        accuracy: Int!
        packaging: PackagingType!
        isLabelled: Boolean!
        labelTemplate: LabelTemplate
    }

    type Station {
        _id: ID!
        title: String!
    }

    type Item {
        _id: ID!
        title: String!
    }

    type PackagingType {
        _id: ID!
        title: String!
    }

    type LabelTemplate {
        _id: ID!
        title: String!
    }

    type Response {
        success: Boolean!
        message: String!
        ID: ID
    }

    type AddSachetResponse {
        ID: ID!
        sachet: Sachet!
    }

    
    # ---------- Queries ----------

    type RootQuery {
        ingredients: [Ingredient!]!
        ingredient(id: ID!): Ingredient!
        processings(ingredientId: ID!): [Processing!]!
        sachets(processingId: ID!): [Sachet!]!
        processingNames: [ProcessingName!]!
        units: [Unit!]!
        stations: [Station!]!
        supplierItems: [Item!]!
        packagings: [PackagingType!]!
        labelTemplates: [LabelTemplate!]!
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
        isDefault: Boolean
        item: ID!
        accuracy: Int!
        packaging: ID!
        isLabelled: Boolean!
        labelTemplate: ID
    }

    input DeleteProcessingInput {
        ingredientId: ID!
        processingId: ID!
    }

    input DeleteSachetInput {
        ingredientId: ID!
        processingId: ID!
        sachetId: ID!
    }

    type RootMutation {
        createIngredient(input: IngredientInput): Ingredient!
        updateIngredient(input: UpdateIngredientInput): Ingredient!
        addProcessings(input: AddProcessingsInput): [Processing!]!
        deleteProcessing(input: DeleteProcessingInput): Response!
        addSachet(input: AddSachetInput): [Sachet!]!
        deleteSachet(input: DeleteSachetInput): Response!
    }


    # ---------- Schema ----------
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)
