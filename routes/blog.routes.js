const express = require('express');
const { showBlogPage, addBlog ,deleteBlog} = require('../controller/blog.controller');
const { verifyToken } = require('../helper/tokenVerify');
const blogRoutes = express.Router();


blogRoutes.get("/", verifyToken, showBlogPage);
blogRoutes.post("/", verifyToken ,addBlog);


module.exports = blogRoutes;


