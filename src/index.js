import express from 'express';
import consign from 'consign';


const passport = require('passport');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

// Routes
consign({cwd: __dirname})
  .include('libs/config.js')
  .then('db.js')
  .then('libs/middlewares.js')
  .then('routes')
  .then('services')
  .then('libs/boot.js')
  .into(app);