import type {Request, Response} from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


const register = asyncHandler(async(req:Request, res:Response)=>{
    const {name, email, password} = req.body as {
        name:string;
        email: string;
        password: string;
    }

    if(!name || !email || !password){
         res.status(400)
         throw new Error('All fields are required')
    }

    const existing = await User.findOne({email});

    if(existing){
         res.status(409)
         throw new Error("User already exists")
    }


    const passwordHash = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password:passwordHash
    })

    res.status(201).json({
        success:true,
        user:{
            id : String(user._id) , 
            name:user.name, 
            email: user.email
        },
        message:"User created successfully"
    })
})

const login = asyncHandler(async(req:Request , res:Response)=>{
    const {email,password} = req.body as {
        email:string;
        password:string;
    }

    if(!email || !password){
         res.status(400)
         throw new Error('All fields are required')
    }

    const existing = await User.findOne({email})

    if(!existing){
         res.status(401)
         throw new Error("User doesn't exist")
    }

    const compare = await bcrypt.compare(password, existing.password)

    if(!compare){
         res.status(401)
         throw new Error("Invalid credentials")
    }

    const token = jwt.sign({
    id: String(existing._id),

    }, process.env.JWT_SECRET  as string ,
    {expiresIn : '7d'})


    res.status(200).json({
        success:true,
        token,
        user:{
            id: String(existing._id),
            name:existing.name,
            email:existing.email
        },
        message:"User logged in successfully"
    })
})





export {register,login}