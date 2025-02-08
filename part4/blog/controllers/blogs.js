const blogRoutes = require('express').Router();
const { request } = require('express');
const Blog = require('../models/blog');

blogRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.status(200).json({
    message: 'Data found!',
    data: blogs,
  });
});

blogRoutes.post('/', async (request, response) => {
  const newBlog = new Blog(request.body);

  const blog = await newBlog.save();

  response.status(201).json({
    message: 'Blog saved!',
    data: blog,
  });
});

module.exports = blogRoutes;
