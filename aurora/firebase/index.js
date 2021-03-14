import firebase from 'firebase/app';
export * from './auth';
const $apps = {};

function FirebaseLoad(_ob_) {
  for (const key in _ob_) {
    const value = _ob_[key];
    if (!(key in $apps)) firebase.initializeApp($apps[key] = { ...$apps['[DEFAULT]'],
      ..._ob_['[DEFAULT]'],
      ...(typeof value === 'string' ? _ob_[value] || $apps[value] : _ob_[key])
    }, key);
  }

  return firebase;
}

export { firebase, FirebaseLoad };