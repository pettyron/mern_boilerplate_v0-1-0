// expose some reusable helper functions and data clips for use elsewhere

// Node's built in file system module
const fs = require('fs');

// moment.js library for displaying dates
exports.moment = require('moment');

// use dump for debugging or dumping data to the page for visualization purposes
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// helper for Google Maps static map creation. Creation is verbose so this helps to keep things clutter free.
exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`;

// populate an icon wherever it may be needed in views
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// the site details
exports.siteName = `This site's name!`; // using back-ticks in case a more dynamic implementation is warranted

// use slugs to create the menu base
// this will obviously need adjustment based on project needs but some basics are provided here
exports.menu = [
    {slug: '/', title: 'Home'},
    {slug: '/about', title: 'About'},
    {slug: '/contact', title: 'Contact'}
];
