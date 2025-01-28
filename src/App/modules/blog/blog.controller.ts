import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from './blog.service';


const createBlog = catchAsync(async (req, res) => {
    const  blogData = {
        ...req.body,
        author: req.user._id,
    };
    const result = await blogServices.createBlogIntoDB(blogData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: result,
    });
});

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await blogServices.getAllBlogsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: result,
    });
});

const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await blogServices.getSingleBlogFromDB(id);

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

const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await blogServices.updateBlogIntoDB(id, title, content, req.user._id);

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

const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await blogServices.deleteBlogFromDB(id);

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