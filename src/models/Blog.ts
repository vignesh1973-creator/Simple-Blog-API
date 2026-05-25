import mongoose, {Schema , Document, Model, Types} from 'mongoose';

interface IBlog extends Document{
    title:string;
    content:string;
    imageUrl?:string;
    imagePublicId?: string;
    author: Types.ObjectId;
    createdAt: Date;
    updateAt:Date;
}


const BlogSchema:Schema<IBlog> = new Schema<IBlog>({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    imagePublicId: {
    type: String
    },
    author:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User",
        index:true,
    }
},{timestamps:true});


export const Blog:Model<IBlog> = mongoose.model<IBlog>('Blog',BlogSchema);