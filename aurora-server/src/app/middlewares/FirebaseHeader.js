const models = require('../models');
const firebase = require('../../config/firebase');
/*
    Este middleware se encargará de verificar que todas las peticiones incluyan un token de usuario
    este token es el mismo que utilizamos para ubicar al usuario en Firebase.
*/
module.exports = async function FirebaseHeaderMiddleware(req, res, next){
    try {
        // Obtenemos el token recibido en el Header
        const token = req.headers['firebase-user-token'];
        if(token){
            // Buscamos ese token en firebase
            req.auth = await firebase.auth().verifyIdToken(token)
                .then(user=>models.users.findOne({uid:user.uid})) // Obtenemos el usuario de Firebase y lo guardamos en el auth
                .catch(()=>null) // Si el token es errado no guardamos usuario
        }
    }
    catch (error) { next(error); }
    finally{ next(); }
}