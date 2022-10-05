const router = require('express').Router()

const friendController = require('../controllers/friendController')

router.post('', friendController.createFriend)

router.get('', friendController.getFriends)

router.get('/ByUserId/:userId', friendController.getFriendsByUserId)

router.delete('/:id', friendController.DeleteFriend)

module.exports = router