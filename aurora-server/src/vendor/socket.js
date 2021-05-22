const SocketIO = require('socket.io');
const models = require('../app/models');


module.exports = {
    $middlewares:[],
    bind(event, executor){
        this.$middlewares.push({
            event,
            executor,
        });
    },

    listen(server){
        const io = SocketIO(server);
        io.on('connection', async (socket)=>{
            // const auth = socket.handshake.auth;
            // const user = await models.users.findOne( jwt.decode(auth.token) );
            // for(bind of this.$middlewares){
            //     if(socket.connected && !bind.executor(user, socket))
            //         socket.disconnect();
            // }
        });
    },


};