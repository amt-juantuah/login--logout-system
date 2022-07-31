const express = require('express');
var router = express.Router();

const credetials = {
    email: "admin@gmail.com",
    password: "adminadmin"
}

// login user
router.post('/login', (req, res) => {
    if (req.body.email == credetials.email && req.body.password == credetials.password) {
        req.session.user = req.body.email;
        req.session.username = req.body.username;
        res.redirect('/route/dashboard');
        // res.end("Login Successful");
    }
    else {
        res.end("Invalid email or password!");
    }
})

//route for dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', {
            title: "Welcome to Brigde Logistics",
            user: req.session.username,
        })
    }
    else {
        
        res.send("<h1 style='width: 300px;margin: auto; color: red; display: flex; margin-top: 100px; text-align: center'>Unauthorized User <br> ~ visit '/' </h1>");
    }
})

// route for logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('base', {title: "Bridge Login System", logout: "Successfully Logged Out!!"})
})

module.exports = router;