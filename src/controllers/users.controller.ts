import {Request, Response, NextFunction} from 'express';
import UserModel from '../models/user.model';
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