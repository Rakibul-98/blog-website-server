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
        ref: 'User'
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

// stop display deleted blogs
blogSchema.pre('find',function(next){
    this.find({isDeleted:{$ne:true}});
    next();
  })
  
  // stop finding deleted blogs by specific search
  blogSchema.pre('findOne',function(next){
    this.findOne({isDeleted:{$ne:true}});
    next();
  })
  
  // stop finding deleted blogs by aggregation
  blogSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{isDeleted :{$ne:true}}});
    next();
  })

export const BlogModel = model<TBlog>('Blog', blogSchema);