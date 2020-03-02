const mongoose = require('mongoose');

const SachetSchema = new mongoose.model({
    valid : {
        type : Boolean,
        default : false
    },
    tracking : {
        type : Boolean,
        required : ['Tracking value is required.']
    },
    modes : [{
        type : {
            type : String,
            enum : ['Real Time', 'Co-Packer', 'Planned Lot'],
            required : ['Mode of fulfillment is required for a sachet.']
        },
        station : {
            // TBD
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Station',
            required : ['Station is required for a sachet.']
        },
        supplier_items : [{
            // TBD
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Items',
            validate : [
                (items) => items.length > 0,
                'Atleast one supplier item is required for a sachet.'
            ]
        }],
        accuracy : {
            type : String,
            enum : ['85% - 100%', 'Below 85%', 'don\'t weigh'],
            required : ['Accuracy is required for a sachet.'],
        },
        packaging : {
            // TBD
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Packaging',
            required : ['Packaging type is required for a sachet.']
        },
        label : {
            type : String,
            required : ['Label is required for a sachet.']
        },
        label_template : {
            type : mongoose.Types.Schema.ObjectId,
            ref : 'Templates',
            required : ['Label template is required for a sachet.']
        }
    }]
});

module.exports = mongoose.model('Sachet', SachetSchema);