import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";


const blogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: [true, 'Blog tutle is mandatory!'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Blo description is required!'],
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

export const BlogModel = model<TBlog>('Blog', blogSchema);