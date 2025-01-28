import httpStatus from 'http-status';
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.models";
import AppError from '../../errors/AppError';
import QueryBuilder from './blog.queryBuilder';

const createBlogIntoDB = async (blog: TBlog) => {
    const newBlog = (await BlogModel.create(blog)).populate({
        path: 'author',
        select: '-password -__v',
    });
    return newBlog;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    // const blogs = await BlogModel.find().populate({
    //     path: 'author',
    //     select: '-password -__v',
    // });
    // return blogs;

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

const getSingleBlogFromDB = async (id: string) => {
    const blog = await BlogModel.findById(id).populate({
        path: 'author',
        select: '-password -__v',
    });
    return blog;
};

const updateBlogIntoDB = async (_id: string, title: string, content: string, userId: string) => {
    // Find the blog to check if the user is the author
    const blog = await BlogModel.findOne({ _id, isDeleted: { $ne: true } });

    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== userId.toString()) {
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

const deleteBlogFromDB = async (_id: string, userId: string) => {

    const blog = await BlogModel.findOne({ _id, isDeleted: { $ne: true } });

    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== userId.toString()) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to update this blog');
    }

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