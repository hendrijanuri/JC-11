const express = require('express')
const router = express.Router()
const {userControllers} = require('../controllers')

router.post('/create-store', userControllers.userCreateStore)
router.get('/get-store', userControllers.userGetStore)
router.put('/update-store', userControllers.userUpdateStore)
router.delete('/delete-store/:id', userControllers.userDeleteData)




module.exports = router