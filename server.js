const dotenv = require('dotenv')
dotenv.config()
const moment = require('moment')
moment.locale('es');

const cors = require('cors')
const mongoose = require('mongoose')

const express = require('express')
const app = express()

app.use(cors() )
app.use(express.json() )

const api = require('./src')
app.use('/api', api)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true }
).then( () => {

    try {
        app.listen(process.env.PORT)
        console.log(`STARTING SERVER ON http://localhost:${process.env.PORT}/api`)
    } catch(error) {
     
        console.log(error)
    }

}).catch(err => {

    console.log(err)
})
