import firebase from '.';
import 'firebase/auth';
const FirebaseApp = firebase.app('auth');
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

const Auth = {
  firebase,
  user: null,

  /* Event Listeners */
  _watchers: {},

  on(eName, ...callback) {
    if (!this._watchers[eName]) this._watchers[eName] = [];

    this._watchers[eName].push(...callback);
  },

  trigger(eName, ...arg) {
    (this._watchers[eName] || []).forEach(c => c.call(this, ...arg));
  },

  /* Methods */
  signOut(...props) {
    return FirebaseApp.auth().signOut().then(...props);
  },

  signIn() {
    return this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
  },

  signInWithProvider() {
    return FirebaseApp.auth().signInWithRedirect(...arguments);
  }

};
FirebaseApp.auth().onAuthStateChanged(async user => {
  let prevUser = Auth.user;

  if (prevUser && !user || !prevUser && user) {
    if (user) {
      Auth.user = user.providerData[0];
      Auth.trigger('signIn', Auth.user);
    } else Auth.trigger('signOut', prevUser);
  }

  Auth.trigger('statusChanged', Auth.user);
});
export default Auth;
console.clear();

let Learn = spells => spells.split('').reduce((_, spell) => {
  _.tmp += spell;

  if (_.tmp.length === 2) {
    _.words.push(_.tmp + spell);

    _.tmp = '';
  }

  return _;
}, {
  tmp: '',
  words: []
}).words.sort(() => .5 - Math.random()).join(' ');

"mamemimomupapepipopu".split("").reduce((_, spell) => {
  if (_.tmp.length) {
    _.words.push(_.tmp + spell);

    _.tmp = '';
  } else _.tmp += spell;

  let c = _.tmp.length ? _.words.push(_.tmp + spell) && delete _.tmp : _.tmp += spell;
  return _;
}, {
  words: [],
  tmp: ''
}).words;