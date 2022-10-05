const connection = require('../dataBase/MySQL')
const passwordHelper = require('../helpers/hashPassword')
const tokenHelper = require('../helpers/tokenHelper')

module.exports = {
    auth: async (req, res)=>{
        let data = req.body
        let user = await connection.query(`SELECT *
                                               FROM user
                                               WHERE user.email = "${data.email}"`)
        //console.log(data, user[0])
        if(!user[0][0]){
            res.json("Wrong email or password")
            throw new Error("Wrong email or password")
        }
        await passwordHelper.compare(user[0][0].password, data.password)
        let tokenPair = tokenHelper.generateTokenPair()
        res.json(tokenPair)
    }
}