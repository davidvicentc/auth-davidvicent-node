const passport = require('passport');
const User = require('../models/User.js')
const localStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
})

passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({ email });
    if (user) {
        return done(null, false, req.flash('signupMessage', 'El email ya existe en la base de datos'))
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);

        await newUser.save();
        done(null, newUser);
    }
}))

passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email });

    if (!user) {
        done(null, false, req.flash('signinMessage', 'El usuario no existe'))
    }

    if (!user.comparePassword(password)) {
        done(null, false, req.flash('signinMessage', 'La contraseña es incorrecta'))
    }

    done(null, user)
}))