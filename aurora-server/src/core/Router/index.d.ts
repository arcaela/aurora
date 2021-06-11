import express = require('express');

declare global {
    namespace Express {
        interface Request {
            input(...keys : string[] ) : any
            input(key : string | string[] ) : any
            only(...keys : string[] ) : any
            only(key : string | string[] ) : any
            except(...keys : string[] ) : any
            except(key : string | string[] ) : any
        }
        interface Response {
            success(data : any) : express.Response
            error(message : string | typeof Error) : express.Response
        }
    }
}

const Router : express.Router;
export = Router;