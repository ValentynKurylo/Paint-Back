const router = require('express').Router()

const pictureController = require('../controllers/pictureController')

router.post('', pictureController.createPicture)

router.get('/userId/:userId', pictureController.getPicturesByUserId)

module.exports = router