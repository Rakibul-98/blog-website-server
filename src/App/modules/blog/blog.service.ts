import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.models";


const createBlogIntoDB = async (blog: TBlog) => {
    const newBlog = await BlogModel.create(blog);
    return newBlog;
};

const getAllBlogsFromDB = async () => {
    const blogs = await BlogModel.find();
    return blogs;
};

const getSingleBlogFromDB = async (id: string) => {
    const blog = await BlogModel.findById(id);
    return blog;
};

const updateBlogIntoDB = async (_id: string, title: string, content: string) => {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
        {_id, isDeleted: { $ne: true }},
        {
            title,
            content,
            updatedAt: new Date(),
        },
        { new: true }
    );
    return updatedBlog;
};

const deleteBlogFromDB = async (_id: string) => {
    const deletedBlog = await BlogModel.findByIdAndUpdate(
        {_id, isDeleted: { $ne: true }},
        { isDeleted: true },
        { new: true }
    );
    return deletedBlog;
}

export const blogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogFromDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
}