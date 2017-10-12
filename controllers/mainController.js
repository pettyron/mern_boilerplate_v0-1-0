const mongoose = require('mongoose');
const Stock = mongoose.model('Stock');

exports.homePage = (req, res) => {
    res.render('index', {title: 'Home'});
};

// This is an example controller to feed a test AJAX request from React
// Preferrably, in a production environment you want to match data on a distinct _id and then go from there. But this works for just testing.
exports.testPage = async (req, res) => {
    const name = await Stock.collection.distinct('name');
    res.json(name);
};
