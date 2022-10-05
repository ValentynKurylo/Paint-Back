const connection = require('../dataBase/MySQL')
const path = require("path");

module.exports = {
    createPicture: async (req, res)=>{
        let body = req.body
        let data = await connection.query(`INSERT into picture(name, path, user_id) values ("${body.name}", "${body.id}", "${body.user_id}")`)
        res.json("Picture was added")
    },

    getPictures: async (req, res)=>{
        let data = await connection.query(`SELECT * from picture`)
        res.json(data[0])
    },

    getPicturesByUserId: async (req, res)=>{
        let userId = req.params.userId
        let data = await connection.query(`SELECT * from picture WHERE picture.user_id = ${userId}`)
        res.json(data[0])
    }
}

