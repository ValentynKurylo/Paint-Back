const bcrypt = require("bcrypt")

module.exports = {

    compare: async (hashPassword, password)=>{
        const isPassword = await bcrypt.compare(password, hashPassword)
        if(!isPassword){
            throw new Error("Wrong email or password ")
        }
    },

    hash: (password)=> bcrypt.hash(password, 6)
}