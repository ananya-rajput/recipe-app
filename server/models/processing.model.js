const mongoose = require('mongoose');

const ProcessingSchema = new mongoose.Schema({
    isValid : {
        type : Boolean,
        default : false
    },
    type : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ProcessingName'
    },
    sachets : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Sachet'
    }]
}, {
    timestamps : true
});

module.exports = mongoose.model('Processing', ProcessingSchema);