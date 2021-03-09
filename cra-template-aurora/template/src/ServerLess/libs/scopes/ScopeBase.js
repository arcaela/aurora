import { set, get, has, merge } from 'lodash'

export default class ScopeBase {
    constructor({snap, options}, primaryKey){
        Object.defineProperties(this,{
            $doc:{ enumerable:false, writable: false, value: snap.ref },
            $table:{ enumerable:false, writable: false, value: snap.ref.parent },
            [primaryKey || 'id']:{ enumerable:true, writable:false, value:snap.id, },
        });
        return merge(this, snap.data(options));
    }


    $data(){ return {...this} };
    toJSON(){ return {...this} };
    $has(path){ return has(this, path); }
    $get(path){ return get(this, path); }
    $set(path, value){ set(this, path, value); return value; }
    async $delete(){ return this.$doc.delete(); }
    async $save(){ return this.$doc.set(this.toJSON()).then(()=>this); }
    async $update(props={}, save=true){ merge(this, {...props}); return save?this.$save():this; }
}