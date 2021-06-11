const _ = require('lodash');
const state = {
    active:null,
    drivers:{},
};
function Storage(name, ...driver){
    const exists = state.drivers[name];
    if(exists&&!driver.length) return exists;
    if(!exists&&!driver.length) throw new Error("DRIVER_NOT_EXISTS");
    if(driver.length&&exists) throw new Error("DRIVER_ALREADY_EXISTS");
    return state.active = state.drivers[name] = driver[0];
}
module.exports = new Proxy(Storage,{
    set:(...[,key,value])=>{
        if(!state.active) throw new Error("DRIVER_UNSELECTED");
        return _.merge(state.active,{[key]:value});
    },
    get:(...[,key])=>{
        if(!state.active) throw new Error("DRIVER_UNSELECTED");
        return state.active[key];
    },
});







const storage = new Storage("/tmp/");

storage.put('/avatar.png', new File, {
    mime:'image/png',
    createdAt:Date.now(),
})


storage.get('/avatar.png', ()=>{

    let file = {};
    file.headers = {};
    file.size = new Blob( new ArrayBuffer(1024) );
    file.size.stream();
    

    

});