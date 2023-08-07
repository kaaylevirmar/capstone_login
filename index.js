const express = require("express");
const passport = require('passport')
const localStrategy = require('passport-local');
const User = require('./models/user');




const app =  express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
//user Routers
app.engine('ejs', ejsMate);

const dashboardRouter = require('./server/routes/dashboardRouter');
const usersRouters = require('./server/routes/usersRouters');
const employeesRouters = require('./server/routes/employeesRouters');
const transactionRouters = require('./server/routes/transactionRouters');
const leaveRouters = require('./server/routes/leaveRouter');

app.set('views', path.join(__dirname,'./client/views'));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'thisismysecret'
}))

app.use(flash());


app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



// Parse form data
app.use(express.urlencoded({extended:true}))

// Set static files
app.use(express.static('public'));

//Configure Method override
app.use(methodOverride('_method'));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use('', dashboardRouter)
app.use('', employeesRouters)
app.use('', leaveRouters)
app.use('', transactionRouters)
app.use('', usersRouters)

app.use('*',(req, res, next)=>{
    next(new ExpressError('Page not found Error BOI!', 404));
})

const activePage = '';
// Error Handler Middleware
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render('error', {err, activePage});
})

app.listen(5000,() => {
    console.log("Server running in port 5000");
})