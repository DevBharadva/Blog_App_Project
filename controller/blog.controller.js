const Blog = require('../model/blog.model');


exports.showBlogPage = async (req, res) => {
    try {
        let blogs = await Blog.find();
        res.render("blog.ejs", { blogs });
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error..." });
    }
};

exports.addBlog = async (req, res) => {
    try {
        let blog = await Blog.findOne({ title: req.body.title });
        if (blog) {
            res.json({ message: 'Already added...' });
        }
        blog = await Blog.create(req.body);
        res.redirect("/api/blog")
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error..." });
    }
};

