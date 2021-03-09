import React from 'react'
import { scopes, firebase } from '~/ServerLess';

const $store = {
    user:null,
    firestore:false,
    unsubscribed:false,
    async flush(){
        if(this.unsubscribed) this.unsubscribed=await this.unsubscribed() && false;
        if(this.firestore) this.firestore=await this.firestore() && false;
    },
};


export default function useAuth(){
    const [ user, _setUser ] = React.useState($store.user);
    const setUser = _user=>_setUser(()=>($store.user=_user));
    React.useEffect(()=>{
        if(user===false) $store.flush();
        else if(user===null){
            $store.unsubscribed = firebase.auth().onAuthStateChanged(auth=>{
                if(!auth && user===null) setUser(false);
                else if(auth)
                    $store.firestore = scopes.users.doc(auth.uid)
                        .onSnapshot(snap=>setUser(snap.data()));
            });
        }
    }, [ user ]);
    return user;
}