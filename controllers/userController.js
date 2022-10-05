const connection = require('../dataBase/MySQL')
const passwordHelper = require('../helpers/hashPassword')

module.exports = {
    createUser: async (req, res) => {
        let body = req.body
        let hashPassword = await passwordHelper.hash(body.password)
        body.password = hashPassword
        let data = await connection.query(`INSERT into user(username, email, password) values("${body.username}", "${body.email}", "${body.password}")`)
        res.json("User was added")
    },

    getUsers: async (req, res)=>{
        let users = await connection.query(`SELECT id, username, email FROM user`)
        res.json(users[0])
    },

    getUserById: async (req, res)=>{
        let id = req.params.id
        let user = await connection.query(`SELECT id, username, email FROM user WHERE user.id = ${id}`)
        res.json(user[0][0])
    },

    getUserByEmail: async (req, res)=>{
        let email = req.params.email
        let user = await connection.query(`SELECT id, username, email, role from user WHERE user.email = "${email}"`)
        res.json(user[0][0])
    }
}