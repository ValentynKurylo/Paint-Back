const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const WsHandler = require('./WS-Handler/WS-Handler')
const {json} = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(cors())

app.ws('/', (ws, req)=>{
    //console.log('Connected')
    //ws.send("You are succusseful connected")
    ws.on('message', (msg)=>{

        msg = JSON.parse(msg)
        //console.log(msg)
        switch (msg.method){
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
        }
    })
})



app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)})

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    //console.log('func', msg)
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            //console.log(msg.username)
            client.send(JSON.stringify(msg))
        }
    })
}

app.post('/image', (req, res)=>{
    try {
        const data = req.body.img.replace(`data:image/png;base64,`, '')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
        return res.status(200).json({message: "Download"})
    }catch (e){
        console.log(e)
        return res.status(500).json('error')
    }
})
app.get('/image', (req, res)=>{
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const data = `data:image/png;base64,` + file.toString('base64')
        res.json(data)
    }catch (e){
        console.log(e)
        return res.status(500).json('error')
    }
})
