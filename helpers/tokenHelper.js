const jwt = require('jsonwebtoken')
const {promisify} = require('util')

const verifyPromise = promisify(jwt.verify)

module.exports = {
    generateTokenPair: ()=>{
        const accessToken = jwt.sign({}, "SECRET" , {expiresIn: '15m'})
        const refreshToken = jwt.sign({}, "SECRET" , {expiresIn: '30d'})

        return{
            accessToken,
            refreshToken
        }
    },

}