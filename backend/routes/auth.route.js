const express = require('express')
const router = express.Router()

//Load Controllers
const {googleController} = require('../Controllers/auth.controller');

router.post('/googlelogin',googleController);

module.exports = router