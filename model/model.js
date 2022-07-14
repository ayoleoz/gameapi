const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    Id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    Name: {
        required: true,
        type: String
    },
    Popularity: {
        required: true,
        type: Number
    },
    Publisher: {
        required: true,
        type: String
    },
    Type: {
        type: String
    }
});

module.exports = mongoose.model('Data', dataSchema);