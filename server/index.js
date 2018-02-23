import router from './core/router.js';
import express from 'express'
import mongoose from 'mongoose';
import config from './core/config.js'
import Q from 'q';
import bodyParser from 'body-parser';
import Express from 'express'
import path from 'path';
import passport from 'passport'

const requireToken = passport.authenticate('jwt', {session: false})
const requirePassword = passport.authenticate('local', {session: false})

const app = express()
const port = process.env.PORT || 3000
// body parser and content limit for images
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.static('public'))
// api routes
router(app)
// database
mongoose.Promise = Q.Promise;
mongoose.connect(config.mongoConnect)
// application
app.get("*", (req, res) => { 
  res.sendFile(path.resolve('server', 'index.html'))
})
app.listen(port, () => console.log('Server is working on ' + port))
