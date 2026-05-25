import express from 'express';
import { ConnectDB } from './config/db.js';
import dotenv from 'dotenv';
import {errHandler} from './middlewares/errHandler.js'
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import authRoutes from './routes/authRoutes.js'
import morgan from 'morgan';
import path from 'path';
import blogRoutes from './routes/blogRoutes.js'


dotenv.config()


const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

ConnectDB();


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)


app.get('/',(req,res)=>{
    res.json({
        message:'hllo'
    })
})

app.use(errHandler)

app.listen(port,()=>{
    console.log("server started running")
})

