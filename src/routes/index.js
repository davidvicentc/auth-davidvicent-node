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
    successRedirect: '/portafolio',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

Router.get('/signin', isNotAuthenticated, (req, res, next) => {
    res.render('signin')
});

Router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/portafolio',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

Router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/signin')
})

Router.get('/portafolio', isAuthenticated, (req, res) => {
    res.render('portafolio')
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

    res.redirect('/portafolio');
}

module.exports = Router