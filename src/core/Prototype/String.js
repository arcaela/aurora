/**************    Strings   **************/
const String = window.String;
String.is=str=>(typeof str=='string');
String.prototype.chunk = function(n=1,...join){
    let Str = this.split(""),Res = [];
    while(Str.length) Res.push(Str.splice(0, n).join(""));
    return join.length?Res.join(join[0]):Res;
};
String.prototype.rchunk = function(n=1,...join){
    let Str = this.split(""),Res = [];
        while(Str.length) Res.unshift(Str.splice(n*(0-1)).join(""));
    return join.length?Res.join(join[0]):Res;
};
String.prototype.in = function(match, insensitive){
    return !!(this.match(
        new RegExp(match,'g'+(insensitive?'i':''))
    ));
};
String.prototype.isStart=function(match){ return this.match(new RegExp(`^${match}`))?true:false; }
String.prototype.isEnd=function(match){ return this.match(new RegExp(`${match}$`))?true:false; }
String.prototype.startWith=function(match){ return match+this.replace(new RegExp(`^${match}(.*)`,'gi'), "$1"); }
String.prototype.endWith=function(match){ return this.replace(new RegExp(`^(.*)${match}$`,'gi'), "$1")+match; }
String.prototype.endWith=function(match){ return this.match(new RegExp(`${match}$`))?this.toString():(this+match);}
String.prototype.subFrom = function(str=null){ return this.substring( (str&&(h=this.indexOf(str))>=0)?h+1:0 ); };
String.prototype.subTo = function(str=null){ return this.substring(0,...((str&&(last=this.lastIndexOf(str))>=0)?[last]:[])); };
String.prototype.subrFrom = function(str=null){ return this.substring(...((str&&(last=this.lastIndexOf(str))>=0)?[last+1]:[])); };
String.prototype.clear = function(char=" "){return this.replace(new RegExp(`${char}+`,"gi"),char);}
String.prototype.ucFirst=function(){ return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase(); }
String.prototype.ucWords=function(){ return this.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) { return $1.toUpperCase() }) }
export default String;