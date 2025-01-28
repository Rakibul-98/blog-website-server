import { Types } from "mongoose";

// define blog types
export type TBlog = {
    title : string;
    content : string;
    author : Types.ObjectId;
    isPublished: boolean;
    isDeleted: boolean;
}