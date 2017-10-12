const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const { catchErrors } = require('../handlers/errors');

router.get('/', mainController.homePage);
router.get('/test', mainController.testPage);

module.exports = router;
