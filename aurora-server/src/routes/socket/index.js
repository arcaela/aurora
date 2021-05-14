/*
    Development | Esta sección está actualmente en desarrollo.
*/
const { socket } = require('../../vendor');

/* Creamos un middleware para filtrar los sockets que pueden escuchar ciertos eventos */
socket.bind('user.updated', (user /* ,socket */)=>{
    return user!==null;
});