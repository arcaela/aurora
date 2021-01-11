window.rand=(min=0,max=999999999999)=>Math.floor((Math.random()*(max-min+1)+min));
window.ucfirst=function (str) { return String.is(str)?str.ucFirst():str;};
window.ucwords=function (str) { return String.is(str)?str.ucWords():str;};
window.strtolower=function (str) { return String.is(str)?str.toLowerCase():str;};
window.strtoupper=function (str) { return String.is(str)?str.toUpperCase():str;};
window.blank=function(arr){
    return (null
        ||arr===null
        ||arr===undefined
        ||(Array.is(arr)&&!arr.length)
        ||(Object.is(arr)&&!Object.keys(arr).length)
        ||(String.is(arr)&&arr.trim().length==0)
    );
};
window.empty=function(arr){
    return (null
        ||arr===null
        ||arr===false
        ||arr===undefined
        ||(Array.is(arr)&&!arr.__pop().length)
        ||(Object.is(arr)&&!Object.keys(arr).length)
        ||(String.is(arr)&&!arr.trim().length)
        ||(Number.is(arr)&&arr<=0)
    );
};
window.$_GET = V=>(V==undefined?URL.toJson(location.search):(URL.toJson(location.search)[V]||undefined))
window.setcookie=function (...name) {
    return name.length==0?undefined:(
        this.cookie[name.length==1?'get':'set'](...name)
    );
};
window.unsetcookie=function (name) { return this.cookie.remove(name); };
window.cookie = {
    toSeconds: function (time = 3) {
        time
            = empty(time) ? 0 : time;
        var now = new Date().getTime();
        time = Number.is(time) ? (new Date().getTime() + time) : (
            String.is(time) ? new Date(time).getTime() : new Date("2035").getTime()
        );
        return e = (time - now), e > 0 ? e : 0;
    },
    set: function (name, value, time = Infinity, path, domain, https = null) {
        return document.cookie =
            encodeURIComponent(name)
            + "=" + encodeURIComponent(value)
            + ("; max-age=" + this.toSeconds(time))
            + (path ? "; path=" + path : "")
            + (domain ? "; domain=" + domain : "")
            + (https ? "; secure" : "");
    },
    get: function (name) {
        return this.all[name]||undefined;
    },
    remove: function (name, ...server) {
        return this.set(name, undefined, false, ...server),!this.all[name];
    },
    has: function (key) {
        return Object.keys(this.all).indexOf(key||null);
    },
    get all() {
        var cookies = [];
        return document.cookie.split(';').forEach(cookie => {
            cookies[decodeURIComponent(cookie.substr(0, cookie.indexOf('='))).trim()] =
                decodeURIComponent(cookie.substr(cookie.indexOf('=') + 1));
        }), cookies;
    }
};
window.collect = function(...items){
    let Collection = require('./Collection');
    return new Collection(...items);
};
window.cache = (key, ...next)=>{
    let BD = window.localStorage;
    if(next.count(0)){
        let data = JSON.parse(BD.getItem(key)||'{"expire":0}');
        return (new Date()).getTime()<data.expire?data.data:undefined;
    }
    else if(next.count(1,'>=')){
        return BD.setItem(key,JSON.stringify({
            key,
            expire: ((new Date).getTime() + ((Number.is(next[1])||180)*1000)),
            data:next[0],
        })),next[0];
    }
};
window.getPrototype = (ob,key)=>((ob.prototype||ob.__proto__)[key]);
window.setPrototype = (ob,key,val)=>((ob.prototype||ob.__proto__)[key]=val);
window.instanceOf = (ob,name)=>(typeof name=='string'?(
    (getPrototype(ob,'constructor')||{name:undefined}).name==name
):(ob instanceof name));
window.WhatsApp =($phone, $text)=>((['https://wa.me/#{phone}?phone=#{phone}','https://web.whatsapp.com/send?phone=#{phone}'][window.innerWidth<=500?0:1])
    .replace(/\#\{phone\}/gi, $phone) + '&text=' + encodeURI($text));
window.indexedDB = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB);
window.IDBTransaction = (window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"});
window.IDBKeyRange = (window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange);