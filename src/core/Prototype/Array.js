/**************    Array   **************/
const Array = window.Array;
Array.prototype.count = function(...arg){ return arg.length>0?eval(arg[0]+(arg[1]||'==')+this.length):this.length; }
Array.prototype.shuffle = function(){ return this.sort(()=>Math.random()-0.5); };
Array.prototype.unique = function(key){let list=[];
    return this.filter(o=>(list.indexOf(o[key])<0)?(list.push(o[key]),true):false);
};
Array.prototype.push = function(...more){for(let i=0;i<more.length;i++) this[this.length]=more[i];return this;};
Array.prototype.first = function(HasArray=false){ return $Array=this.slice(0,1),(HasArray?$Array:$Array[0]); };
Array.prototype.last = function(HasArray=false){ return $Array=this.slice(-1),(HasArray?$Array:$Array[0]); };
Array.prototype.where = function(key,...value){
    return this.filter(item=>{
        return (item===key)||(
            Object.is(item)&&(Object.keys(item).indexOf(key)&&(!value.length||(value.length&&value[0]===item[key])))
        );
    });
};
Array.prototype.rand = function(){
        let min=0,
            max=(this.length?(this.length-1):0);
        if(arguments.length){
            min = !isNaN($min=parseInt(arguments[0]))?(
                $min<0?0:$min
            ):min;
            max = !isNaN($max=parseInt(arguments[1]||null))?(
                $max<0?0:(
                    $max>=this.length?(
                        this.length?(this.length-1):0
                    ):$max
                )
            ):max;
        }
        index = Math.round(Math.random()*(max-min)+min);
    return this[index];
};
Array.prototype.__pop = function(){ return this.filter(e=>!empty(e)); }
Array.collect = (arr)=>Array.isArray(arr)?arr:[arr];
Array.is = (arr)=>{ return Array.isArray(arr)?arr:false; };

export default Array;