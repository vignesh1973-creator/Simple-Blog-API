import mongoose from "mongoose";


export const ConnectDB = async():Promise<void>=>{
    try {
        const MONGO_Str= process.env.MONGO_URI;

        if(!MONGO_Str){
            throw new Error('MONGO_URI is not defined in env varaibles')
           
        }

         await mongoose.connect(MONGO_Str)

        console.log('Database Connected')

            process.on('SIGINT', async()=>{
            await mongoose.connection.close();
            process.exit(0)
        })

    } catch (err) {
        throw new Error(`failed to connect to DB ${err}`)
        
    }
}


export const DisconnectDB = async():Promise<void>=>{
    try {
        await mongoose.connection.close();
        

    } catch (error) {
        
    }
}
