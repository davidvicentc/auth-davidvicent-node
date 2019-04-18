const express = require('express')
const hbs = require('hbs')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash');
const port = process.env.PORT || 3000;
//initializations
const app = express();
require('./database.js')
require('./passport/local-auth')

//settings
app.set("views", path.join(__dirname, "views"))
hbs.registerPartials(path.join(__dirname, 'views/partials'))
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "hbs")
app.set('port', process.env.PORT || 3000)

//middleware


app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'MYSECRETKEY',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// enviar mensaje a la vista
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.signinMessage = req.flash('signinMessage')
    app.locals.user = req.user;
    next()
})

// routes

app.use(require('./routes/index'));

//listen server
app.listen(port, () => {
    console.log(`server on port ${app.get('port')}`)
})