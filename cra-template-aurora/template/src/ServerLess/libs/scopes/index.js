// import firebase from '~/ServerLess/configs/firebase';
// import UserClass from './Users';

/* Scopes */
const scopes = {
    /*users:firebase.firestore().collection('users').withConverter({
        fromFirestore:(snap,options)=>new UserClass({snap, options}),
        toFirestore(_class) { return (_class instanceof UserClass)?_class.toJSON():_class; },
    }),*/
};

export default scopes;
