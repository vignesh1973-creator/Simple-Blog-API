import {Request, Response, NextFunction} from 'express';


export const errHandler=(
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        success:false,
        message: err.message || "Internal server error"
    })
}