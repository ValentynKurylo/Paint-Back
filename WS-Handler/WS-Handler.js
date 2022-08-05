

module.exports = {
    connectionHandler: (ws, msg, aWss) => {
        ws.id = msg.id
        this.broadcastConnection(ws, msg, aWss)
    },

    broadcastConnection: (ws, msg, aWss) => {
        aWss.clients.forEach(client => {
            if (client.id === msg.id) {
                console.log(msg.username)
                client.send(JSON.stringify('User ' + msg.username + ' was connected'))
            }
        })
    }
}