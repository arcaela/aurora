/**************    URL   **************/
const URL = (window.URL||{});
URL.toJson = function(url){
    return Object.is(url)?url:(
        String.is(url)&&url.in(/[=?&]/gi)?(url
            .subrFrom('/')
            .subFrom('?')
            .subTo('#')
            .split('&').filter(c=>!empty(c))
            .map(c=>decodeURIComponent(c).split('=')).reduce(function(target, c){
                    let val = c.slice(1)[0]||true;
                        target[c[0]]=(val=='false'?false:(Number.is(val)||val));
                    return target;
            },{})):{}
    );
};
URL.set = function(str, merge=false){
    str = String.is(str)?str:'?'+JSON.toURL(str);
let data = JSON.toURL(Object.merge(
        URL.toJson(merge?window.location.href:''),
        URL.toJson(str)
    )),
    url = window.location.origin+(str.match(/^\//)?str.subTo('?'):(
        str.match(/^\?/)?(window.location.pathname||''):(
            (window.location.pathname||'')+'/'+str.subTo('?')
        )
    )).clear('/').clear('#').clear("\\?");
    return window.history.pushState({},'',url+(data?'?'+data:''));
};
export default URL;