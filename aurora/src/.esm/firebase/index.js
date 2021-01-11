import firebase from 'firebase/app';
import credentials from './__credentials';

import auth from './auth'
import storage from './storage'
import database from './database'
import __credentials from './__credentials'
for(const key in credentials)
    firebase.initializeApp({
        ...credentials['[DEFAULT]'],
        ...credentials[key],
    }, key);
export default firebase;
export {
  auth,
  storage,
  database,
  firebase,
  __credentials,
}
