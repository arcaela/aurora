export * as AsyncWorker from './AsyncWorker';
export * as AsyncXHR  from './AsyncXHR';
export * as AwaitPromises  from './AwaitPromises';


// window.$_GET = V=>(V==undefined?URL.toJson(location.search):(URL.toJson(location.search)[V]||undefined))


export const rand=(min=0,max=999999999999)=>Math.floor((Math.random()*(max-min+1)+min));

export const cache = (key, ...next)=>{
    let BD = window.localStorage;
    if(!next.length){
        let data = JSON.parse(BD.getItem(key)||'{"expire":0}');
        return (new Date()).getTime()<data.expire?data.data:undefined;
    }
    else if(next.length>=1){
        return BD.setItem(key,JSON.stringify({
            key,
            data:next[0],
            expire: ((new Date).getTime() + ((typeof parseInt(next[1])==='number'?next[1]:180)*1000)),
        })),next[0];
    }
};

export const WhatsApp =($phone, $text)=>((['https://wa.me/#{phone}?phone=#{phone}','https://web.whatsapp.com/send?phone=#{phone}'][window.innerWidth<=500?0:1])
    .replace(/\#\{phone\}/gi, $phone) + '&text=' + encodeURI($text));

export const blank=function(arr){
    return (null
        ||arr===null
        ||arr===undefined
        ||(Array.isArray(arr)&&!arr.length)
        ||(typeof arr==='string'&&arr.trim().length==0)
        ||(arr && typeof arr==='object'&&!Object.keys(arr).length)
    );
};

export const empty=function(arr){
    return (null
        ||(arr<=0)
        ||arr===null
        ||arr===false
        ||arr===undefined
        ||(Array.isArray(arr)&&!arr.length)
        ||(typeof arr==='string'&&!arr.trim().length)
        ||(arr && typeof arr==='object'&&!Object.keys(arr).length)
    );
};

export const setcookie=function (...name) {
    return name.length==0?undefined:(
        this.cookie[name.length==1?'get':'set'](...name)
    );
};
export const unsetcookie=function (name) { return this.cookie.remove(name); };

export const cookie = {
    toSeconds: function (time = 3) {
        time = empty(time) ? 0 : time;
        let now = new Date().getTime();
        time = !isNaN( parseInt( time ) ) ? (new Date().getTime() + time) : (
            typeof time==='string' ? new Date(time).getTime() : new Date("2035").getTime()
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
    get: function (name) { return this.all[name]||undefined; },
    remove: function (name, ...server) {
        return this.set(name, undefined, false, ...server),!this.all[name];
    },
    has: function (key) { return Object.keys(this.all).includes(key); },
    get all() {
        var cookies = [];
        return document.cookie.split(';').forEach(cookie => {
            cookies[decodeURIComponent(cookie.substr(0, cookie.indexOf('='))).trim()] =
                decodeURIComponent(cookie.substr(cookie.indexOf('=') + 1));
        }), cookies;
    }
};

export const getPrototype = (ob,key)=>((ob.prototype||ob.__proto__)[key]);

export const setPrototype = (ob,key,val)=>((ob.prototype||ob.__proto__)[key]=val);

export const instanceOf = (ob,name)=>(typeof name=='string'?(
    (getPrototype(ob,'constructor')||{name:undefined}).name==name
):(ob instanceof name));
