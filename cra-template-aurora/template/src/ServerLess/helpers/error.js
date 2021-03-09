class Handler extends Error {
    constructor(message){
        super(message);
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, Error)
        if(typeof message==='object'){
            Object.entries(message).forEach(([key, value])=>{
                this[key]=value;
            });
        }
        else this.message = message;
        this.name = "Error";
    }
}



export default function error(data){
    throw new Handler(data);
}