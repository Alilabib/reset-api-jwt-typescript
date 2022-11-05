import { Response, Request, NextFunction } from "express";
import  Jwt  from "jsonwebtoken";
import Error from "../interface/error.interface";
import app from "../config/app";

const handleUnauthorizedError= (next:NextFunction)=>{
    const error: Error = new Error('login Error: please try again');
    error.status = 401;
    next(error);
}

const validateTokenMiddleware = (req:Request,_res:Response,next:NextFunction)=>{
    
    try {
        //get headers
        const authHeaders = req.get('Authorization');
        if(!authHeaders){
            handleUnauthorizedError(next);
        }
        const bearer = authHeaders?.split(' ')[0].toLowerCase();
        const token = authHeaders?.split(' ')[1];
        if(!token || !bearer){
            handleUnauthorizedError(next);   
        }
        const decode =Jwt.verify(token as string ,app.jwt_secret as string) ;
        if(!decode){
            handleUnauthorizedError(next);
        }
        next();
    //check authHeaders validate 

    //get value of token

    //check if bearer tokn or not 

    //token type not bearer 
    //no  token provides        
    } catch (error) {
        handleUnauthorizedError(next);
    }

}

export default validateTokenMiddleware;