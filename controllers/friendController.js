const connection = require('../dataBase/MySQL')

module.exports = {
   createFriend: async (req, res)=>{
       let body = req.body
       let data = await connection.query(`INSERT into friend(userId, friendId) values ("${body.userId}", "${body.friendId}")`)
       res.json("Good")
   },

   getFriends: async (req, res)=>{
       let data = await connection.query(`SELECT * from friend`)
       res.json(data[0])
   },

    getFriendsByUserId: async (req, res)=>{
       let id = req.params.userId
       let data = await connection.query(`SELECT u.id, u.username, u.email, f.id as fId from friend f join user u on f.friendId = u.id WHERE f.userId = "${id}"`)
        res.json(data[0])
    },

    DeleteFriend: async (req, res)=>{
        let id = req.params.id
        let data = await connection.query(`DELETE from friend WHERE friend.id = "${id}"`)
        res.json("Friend was deleted")
    }

}