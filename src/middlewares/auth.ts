import type {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request{
    userId?: string;
}

const authMiddleware = (
    req:AuthRequest,
    res:Response,
    next:NextFunction
)=>{
  try{
    const header = req.headers.authorization;

    if(!header || ! header.startsWith("Bearer ")){
        res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
        return;
    }
    const token = header.slice("Bearer ".length)
    const secret = process.env.JWT_SECRET as string;

    if(!secret){
         res.status(500).json({
            success:false,
            message: "Secret is missing"
        })
        return;
    }

    const decoded = jwt.verify(token, secret) as {id: string};

    req.userId = decoded.id;
    next();

  }
     catch(err){
        return   res.status(401).json({
            success:false,
            message:'unauthorized'
        })
     }
}


export default authMiddleware;