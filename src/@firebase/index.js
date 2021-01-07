import firebase from 'firebase/app';
import credentials from './__credentials';
for(const key in credentials)
    firebase.initializeApp({
        ...credentials['[DEFAULT]'],
        ...credentials[key],
    }, key);
export default firebase;
