import mongoose, {Schema , Document , Model} from "mongoose";


interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
}


const UserSchema:Schema<IUser> = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        required:true,
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },

},{timestamps:true});




const User:Model<IUser> = mongoose.model<IUser>('User',UserSchema);

export default User;