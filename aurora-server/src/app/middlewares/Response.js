module.exports = (req, res, next)=>{
    res.success =(...data)=>res.json({data:data[0],ok:true,timestamp:Date.now(),track:data.slice(1)})
    res.error =(error,track)=>res.json({error,ok:false,timestamp:Date.now(),track,message:typeof error==='string'?error:error.message})
    next();    
};