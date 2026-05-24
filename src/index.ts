import express from 'express';
import { ConnectDB } from './config/db.js';
import dotenv from 'dotenv';
import {errHandler} from './middlewares/errHandler.js'
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import authRoutes from './routes/authRoutes.js'
dotenv.config()


const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


ConnectDB()


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/auth', authRoutes)


app.get('/',(req,res)=>{
    res.json({
        message:'hllo'
    })
})





app.use(errHandler)

app.listen(port,()=>{
    console.log("server started running")
})

