const mongoose = require('mongoose');
const { mongodb } = require('./keys.js')
mongoose.connect(mongodb.PROD, { useNewUrlParser: true })
    .then(db => console.log('la base de datos esta conectada'))
    .catch(e => console.error(e))