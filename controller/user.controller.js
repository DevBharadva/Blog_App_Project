const User  = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.showRegisterPage = async (req, res)=>{
    try {
        res.render("register.ejs");
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error"});
    }
}

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.redirect("/api/user/login");
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        user = await User.create({...req.body, password: hashedPassword });
        res.redirect("/api/user/login");
    } catch (error) {
        console.log(error);
        res.json({ message: "Server error..." });
    }
};


exports.showLoginPage = async (req, res)=>{
    try {
        res.render("login.ejs");
    } catch (error) {
        console.log(error);
        res.json({messag: "Server error..."});
    }
};

exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.render("login", { message: 'Email or password is incorrect' });
        }
        let matchPassword = await bcrypt.compare(req.body.password, user.password);
        if (!matchPassword) {
            return res.render("login", { message: 'Email or password is incorrect' });
        }
        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        // console.log(token);
        // res.json({message : ' login succeess'})
        res.cookie('Authorization', token);
        // res.json({message : 'login succcess...'});
        res.redirect("/api/blog");
    } catch (error) {
        console.log(error);
        res.json({ message: "Server error" });
    }
};
