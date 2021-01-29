import firebase from 'firebase/app';
import Auth from './auth';

function FirebaseLoad(credentials) {
  for (const key in credentials) firebase.initializeApp({ ...credentials['[DEFAULT]'],
    ...credentials[key]
  }, key);

  return firebase;
}

export { Auth, firebase, FirebaseLoad };