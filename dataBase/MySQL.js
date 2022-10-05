const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
    //user: process.env.DB_USERNAME,
    user: "root",
    //password: process.env.DB_PASSWORD,
    password: "root",
    database: 'paint',
    host: 'localhost'
})

module.exports = connection.promise()