const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4} = require('uuid');

// import router.js file
const router = require('./router')

// initialise express app
const app = express();

// set port
const port = process.env.PORT || 3000;


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

//initialise base engine
app.set('view engine', 'ejs');

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));


app.use('/route', router)

// home route
app.get('/', (req, res) => {
    res.render('base', {tite: "Bridge Login System"});
})


// start the server
app.listen(port, () => { console.log("Listening to the server on http://localhost:3000. To stop the server, press CTRL+ C")});