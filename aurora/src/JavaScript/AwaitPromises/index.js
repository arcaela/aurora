class AwaitPromises {
    constructor(executor, reject){
        this.status='pending'
        this.watchers=[]
        try {executor.call(this, d=>this.resolve(d), d=>this.reject(d));}
        catch (error) {(reject||((err)=>{ throw err; })).call(this,error);}
    }
    watch(name, handler, ...arg){
        this.watchers.push({
            name, handler, arg,
            target:this,
            ...(typeof name=='object'?name:(
                typeof name=='function'?{handler:name,name:'then'}:{}
            )),
        });
        return this.$scan$();
    }
    pending(){ this.status='pending'; this.value=undefined; this.error=undefined; return this.$scan$(); }
    resolve(value){ this.status='resolved'; this.value=value; delete this.error; return this.$scan$(); }
    reject(err){ this.status='rejected'; this.error=err; delete this.value; return this.$scan$(); }
    then(callback){return this.watch('then',callback);}
    catch(callback){return this.watch('catch',callback);}
    $scan$(){
        if(this.scaning===true||this.status==='pending') return this;
        this.scaning=true;
        let i=0;
        while(i<this.watchers.length){
            let info=this.watchers[i];
            switch (this.status) {
                case 'resolved':
                    if(info.name!=='catch'){
                        try{
                            this.value=info.handler
                                .call(info.target, ...(info.arg.length?info.arg:[this.value]));
                            delete this.error;
                        }catch(err){this.error=err; this.status='rejected';}
                    }
                    break;
                case 'rejected':
                    if(info.name==='catch'){
                        info.handler.call(info.target, this.error);
                        delete this.value;
                        i=this.watchers.length;
                    }
                    break;
                default:
                    break;
            }
            i++;
        }
        if(i>=this.watchers.length){
            this.watchers=[];
            delete this.scaning;
        }
        return this;
    }
}
AwaitPromises.resolve = (data)=>new AwaitPromises(res=>res(data));
AwaitPromises.reject = (data)=>new AwaitPromises((res,rej)=>rej(data));
export default AwaitPromises;