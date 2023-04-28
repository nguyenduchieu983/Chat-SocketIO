'use strict'
const express = require('express')
const router = express.Router({})
const Auth = require('../middlewares/auth').Auth
const UserController = require('../controllers/userController').UserController
const path = require('path')

router.use(Auth.checkLogin)
router.get('/', (req, res) => {
    console.log("Đã login, redirect");
    let pathFile = path.join(__dirname + '/views/index.html')
    res.sendFile(pathFile);
});
router.get('/login', (req, res) => {
    let pathFile = path.join(__dirname + '/views/login.html')
    res.sendFile(pathFile);
});
router.post('/login', UserController.login)

module.exports = router