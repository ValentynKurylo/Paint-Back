const router = require('express').Router()

const userController = require('../controllers/userController')

router.post('', userController.createUser)

router.get('', userController.getUsers)

router.get('/:id', userController.getUserById)

router.get('/ByEmail/:email', userController.getUserByEmail)

module.exports = router