import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from './blog.service';

// create a blog
const createBlog = catchAsync(async (req, res) => {
    // set author id to the blog data
    const  blogData = {
        ...req.body,
        author: req.user._id,
    };
    const result = await blogServices.createBlogIntoDB(blogData, req.user);

    // send response
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: result,
    });
});

// retrive blogs
const getAllBlogs = catchAsync(async (req, res) => {
    // get query params
    const result = await blogServices.getAllBlogsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: result,
    });
});

// retrieve single blog by id
const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await blogServices.getSingleBlogFromDB(id);

    // checking if the blog exists or not
    if (!result) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'Blog not found!',
            data: {}
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is retrieved successfully',
        data: result,
    })
});

// update a blog
const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const result = await blogServices.updateBlogIntoDB(id, title, content, req.user);

    if (!result) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'Blog not found!',
            data: {}
        });
    }
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog updated successfully',
        data: result,
    })
});

// delete a blog
const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await blogServices.deleteBlogFromDB(id, req.user);

    if (!result) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'Blog not found',
            data: {}
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: {},
    })
})

export const blogControllers = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};