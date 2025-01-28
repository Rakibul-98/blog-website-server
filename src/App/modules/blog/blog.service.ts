import { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.models";
import AppError from '../../errors/AppError';
import QueryBuilder from './blog.queryBuilder';

// create blog into db
const createBlogIntoDB = async (blog: TBlog, loggedinUser: JwtPayload) => {

    // checking if the user blocked or not
    if(loggedinUser.isBlocked){
        throw new AppError(httpStatus.FORBIDDEN,'User is blocked');
    }
    // create a blog and populate author data
    const newBlog = (await BlogModel.create(blog)).populate({
        path: 'author',
        select: '-password -__v',
    });
    return newBlog;
};

// get all blogs
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {

    // implementing the search query
    const blogQuery = new QueryBuilder(
        BlogModel.find().populate({
            path: 'author',
            select: '-password -__v',
        }),
        query,
    )
        .search(['title',
            'content'])
        .sort()
        .filter()

    const result = await blogQuery.modelQuery;
    return result;

};

// get single blog
const getSingleBlogFromDB = async (id: string) => {
    const blog = await BlogModel.findById(id).populate({
        path: 'author',
        select: '-password -__v',
    });
    return blog;
};

// update blog
const updateBlogIntoDB = async (_id: string, title: string, content: string, loggedinUser: JwtPayload) => {

    // checking if the user blocked or not
    if(loggedinUser.isBlocked){
        throw new AppError(httpStatus.FORBIDDEN,'User is blocked');
    }

    // Find the blog to check if the user is the author
    const blog = await BlogModel.findOne({ _id, isDeleted: { $ne: true } });

    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== loggedinUser._id.toString()) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to update this blog');
    }

    // Proceed with the update if the user is the author
    const updatedBlog = await BlogModel.findByIdAndUpdate(
        { _id, isDeleted: { $ne: true } },
        {
            title,
            content,
            updatedAt: new Date(),
        },
        { new: true }
    ).populate({
        path: 'author',
        select: '-password -__v',
    });

    return updatedBlog;
};

// delete blog
const deleteBlogFromDB = async (_id: string, loggedinUser: JwtPayload) => {

    const blog = await BlogModel.findOne({ _id, isDeleted: { $ne: true } });

    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== loggedinUser._id.toString() && loggedinUser.role !== "admin") {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to update this blog');
    }

    // Proceed with the deletion if the user is the author or admin
    const deletedBlog = await BlogModel.findByIdAndUpdate(
        { _id, isDeleted: { $ne: true } },
        { isDeleted: true },
        { new: true }
    );
    return deletedBlog;
};

export const blogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogFromDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
}