// The stock model for getting the first rendering output
// This model can be kept in source or not depending on the level of customization needed.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const stockSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Stock', stockSchema);
