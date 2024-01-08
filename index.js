const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const flash = require('connect-flash');
const flashMiddleware = require('./middlewares/flash_middleware');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(session({
	secret:'happy dog',
	saveUninitialized: true,
	resave: true
}));
app.use(passport.session());
app.use(flash());
app.use(flashMiddleware.setFlash);
app.use(passport.initialize());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});
