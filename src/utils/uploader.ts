import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import type { Request } from 'express';
import path from 'path';

const storage = new CloudinaryStorage ({
        cloudinary,

        params: async(_req: Request, file: Express.Multer.File)=>({
            folder:'blogs',

            allowed_formats:['jpg','jpeg','png', 'webp'],

            public_id:  Date.now() + '-' + path.parse(file.originalname).name,
        })
});


const ImageFileFilter = (
    _req:Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
)=>{
    if (/^image\//.test(file.mimetype)) {
        cb(null,true);
    }
    else{
        cb(new Error('Only image files are allowed'))
    }
}

export const upload = multer({storage, fileFilter: ImageFileFilter,
    limits:{
        fileSize: 5*1024*1024
    }
})






// import path from 'path';
// import fs from 'fs';

// const uploadDir = path.join(process.cwd(),'uploads');
// if(!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir,{recursive:true});
// }

// const storage = multer.diskStorage({
//     destination:(_req, _file,cb)=>{
//         cb(null, uploadDir)
//     },

//     filename:(_req, file, cb)=>{
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const ext = path.extname(file.originalname);
//         cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//     }
// })


// const ImageFileFilter = (
//     _req:any,
//     file: Express.Multer.File,
//     cb: multer.FileFilterCallback
// )=>{
//     if (/^image\//.test(file.mimetype)) {
//         cb(null,true);
//     }
//     else{
//         cb(new Error('Only image files are allowed'))
//     }
// }


// export const upload = multer({
//     storage,
//     fileFilter: ImageFileFilter,
//     limits:{
//         fileSize: 5*1024*1024
//     }
// })

