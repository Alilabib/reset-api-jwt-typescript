import {Request, Response, NextFunction} from 'express';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import app from '../config/app';

const userModel = new UserModel();
export const create = async(req:Request, res:Response, next:NextFunction)=>{
    try {
       const user = await userModel.create(req.body);
        res.json({
            status:'success',
            data:{...user},
            message:"User Created Successfully"
        });
    } catch (error) {
       next(error); 
    }
}

export const getMany =async (_req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await userModel.getMany();
         res.json({
             status:'success',
             data:users,
             message:"Users Successfully"
         });
     } catch (error) {
        next(error); 
     }
}

export const getOne =async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await userModel.getOne(req.params.id  as string);
         res.json({
             status:'success',
             data:user,
             message:"User Get Successfully"
         });
     } catch (error) {
        next(error); 
     }
}

export const updateOne =async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await userModel.updateOne(req.params.id,req.body);
         res.json({
             status:'success',
             data:user,
             message:"User Updated Successfully"
         });
     } catch (error) {  
        next(error); 
     }
}

export const deleteOne =async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await userModel.deleteOne(req.params.id  as string);
         res.json({
             status:'success',
             data:user,
             message:"User Deeleted Successfully"
         });
     } catch (error) {
        next(error); 
     }
}

export const login =async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await userModel.authenticate(req.body.email,req.body.password);
        const token = jwt.sign({user},app.jwt_secret as string);
        if(!user){
            return res.status(401).json({
                status:'error',
                message:"the username and password do not match please try again"
            })
        }
         res.json({
             status:'success',
             data:{...user,token},
             message:"Login Successfully"
         });
     } catch (error) {
        next(error); 
     }
}