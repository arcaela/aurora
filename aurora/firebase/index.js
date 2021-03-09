import firebase from 'firebase/app';
export * from './auth';

function FirebaseLoad(credentials) {
  if (!Object.keys(credentials)) return;

  for (const key in credentials) firebase.initializeApp({ ...credentials['[DEFAULT]'],
    ...credentials[key]
  }, key);

  return firebase;
}

export { firebase, FirebaseLoad };