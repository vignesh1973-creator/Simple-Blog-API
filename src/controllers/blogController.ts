import { Blog } from "../models/Blog.js";
import type { Response } from "express";
import type {AuthRequest} from '../middlewares/auth.js';
import asynchandler from 'express-async-handler';
import cloudinary from "../config/cloudinary.js";

const createBlog = asynchandler(async(
    req:AuthRequest,
    res:Response
)=>{
    const {title, content} = req.body as {
        title: string;
        content: string;
    }

    if(!title || !content){
        res.status(400).json({
            success:false,
            message:"All fields are required"
        })
        return;
    }

    const imageUrl = req.file ?.path;
    const imagePublicId = req.file ?.filename;

    const blog = await Blog.create({
        title,
        content,
        imageUrl,
        imagePublicId,
        author: req.userId
    })

    res.status(201).json({
        success:true,
        blog
    })
})


const listBlogs = asynchandler(async(_req:AuthRequest, res:Response)=>{
    const blogs = await Blog.find()
                             .populate('author', "name email")
                             .sort({createAt: -1});

    res.status(200).json({
        success:true,
        blogs
    })
})


const getBlog = asynchandler(async(req:AuthRequest, res:Response)=>{
        const {id} = req.params as {id: string};
        const blog = await Blog.findById(id)
                                .populate('author', "name email");
    
        if(!blog){
            res.status(400).json({
                success:false,
                message:"Blog not found"
            })
            return;
        }

        res.status(200).json({
            success:true,
            blog
        })

})


const updateBlog = asynchandler(async(req:AuthRequest, res:Response)=>{
        const {id} = req.params as {id:string};
        const blog = await Blog.findById(id);
        
        if(!blog){
            res.status(400).json({
                success:false,
                message:"Blog not found"
            })
            return;
        }

        if(blog.author.toString() !== req.userId){
            res.status(403).json({
                success:false,
                message:"Forbidden"
            })
            return;
        }

        const {title, content} = req.body as {title?: string; content?:string};

        if(typeof title === "string") blog.title = title;
        if(typeof content === "string") blog.content = content;

        // if(req.file) {

        //     if(blog.imageUrl){

        //         const oldPath = blog.imageUrl.replace('/',"");

        //         if(fs.existsSync(oldPath)){
        //             fs.unlinkSync(oldPath);
        //         }
        //     }

        //     blog.imageUrl = `/uploads/${req.file.filename}`;
        // }

       if(req.file){

            if(blog.imagePublicId){

                await cloudinary.uploader.destroy(blog.imagePublicId);
            }

            blog.imageUrl = req.file.path;
            blog.imagePublicId = req.file.filename;
       }

        await blog.save();

        res.status(200).json({
            success:true,
            blog
        })
})


const deleteBlog = asynchandler(async(req:AuthRequest, res:Response)=>{
    const {id }  = req.params as {id: string};
        const blog = await Blog.findById(id);
        
        if(!blog){
            res.status(400).json({
                success:false,
                message:"Blog not found"
            })
            return;
        }

        if(blog.author.toString() !== req.userId){
            res.status(403).json({
                success:false,
                message:"Forbidden"
            })
            return;
        }

        if(blog.imagePublicId){
            await cloudinary.uploader.destroy(blog.imagePublicId);
        }

        await blog.deleteOne();

        res.sendStatus(204);

})



export {createBlog, listBlogs, getBlog, updateBlog, deleteBlog}

