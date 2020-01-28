const express = require('express')
const { Authcontroller } = require('./../controller')


const router = express.Router()

router.get('/authlog/:id', Authcontroller.Authlogin)
router.get('/authlog', Authcontroller.Authlogin)
router.get('/users',Authcontroller.getUsers)


module.exports = router