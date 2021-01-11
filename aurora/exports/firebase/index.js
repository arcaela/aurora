import firebase from 'firebase/app';
export { default as auth } from './auth'
export { default as storage } from './storage'
export { default as database } from './database'
firebase.allow = (credentials)=>{
  for(const key in credentials)
    firebase.initializeApp({
      ...credentials['[DEFAULT]'],
      ...credentials[key],
    }, key);
};
export default firebase;