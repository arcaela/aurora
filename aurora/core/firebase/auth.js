import { firebase } from './index';
import 'firebase/auth';
const FirebaseApp = firebase.app('auth')||firebase;
/*
    Para hacer uso de 'auth' con firebase es necesario importar sus claves en el archivo de credenciales.
    Una vez incluidas las claves solo se hará uso como variable estática

    # Escucha de eventos
    auth.on(event, callback)
    · signIn | Inicio de sesion
    · signOut | Cierre de sesion
    · changed | Cuando se detecta un cambio de sesion

    # Inicio y Cierre de sesión
    auth.signIn();
    auth.signOut(callback);

    # Acceder al Proveedor de Firebase
    auth.firebase
*/
let Watcher = null;
export default function Auth(){
    if(FirebaseApp && !Watcher)
        FirebaseApp.auth().onAuthStateChanged(async user=>{
            let prevUser=Auth.user;
            if((prevUser && !user) || (!prevUser && user)){
                if(user){
                    Auth.user = user.providerData[0];
                    Auth.trigger('signIn', Auth.user);
                }
                else Auth.trigger('signOut', prevUser);
            }
            Auth.trigger('statusChanged', Auth.user);
        });
    return {
        firebase,
        user:null,
        /* Event Listeners */
        _watchers:{},
        on(eName, ...callback){
            if(!this._watchers[eName]) this._watchers[eName]=[];
            this._watchers[eName].push(...callback);
        },
        trigger(eName, ...arg){ (this._watchers[eName]||[]).forEach(c=>c.call(this,...arg)); },
        /* Methods */
        signOut(...props){ return FirebaseApp.auth().signOut().then(...props); },
        signIn(){ return this.signInWithProvider(new firebase.auth.GoogleAuthProvider()) },
        signInWithProvider(){ return FirebaseApp.auth().signInWithRedirect(...arguments); },
    };    
};