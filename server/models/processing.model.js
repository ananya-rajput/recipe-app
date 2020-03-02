const mongoose = require('mongoose');

const ProcessingSchema = new mongoose.Schema({
    isValid : {
        type : Boolean,
        default : false
    },
    type : {
        // very much confused about this!
        type : mongoose.Schema.Types.ObjectId,
        ref : ''
    },
    sachets : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Sachet'
    }]
}, {
    timestamps : true
});

module.exports = mongoose.model('Processing', ProcessingSchema);