const express = require('express')
const Router = express.Router();
const passport = require('passport')
Router.get('/', (req, res) => {
    res.render('index');
});

Router.get('/signup', isNotAuthenticated, (req, res, next) => {
    res.render('signup')
});

Router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

Router.get('/signin', isNotAuthenticated, (req, res, next) => {
    res.render('signin')
});

Router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

Router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

Router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile')
})

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/');
}
function isNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }

    res.redirect('/profile');
}

module.exports = Router