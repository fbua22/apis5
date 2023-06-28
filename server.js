import express from 'express';
import passport from 'passport';
import db from './db.js';
import path from 'path';
import fs from 'fs';
import Authorization from "./auth.js"

const __dirname = fs.realpathSync('.');

////////////////////////////////////////////////////////////////////////////////
class ConverterBackendServer {
  constructor() {

    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    const authorization = new Authorization(app);

    app.get('/getCurrencies', this._getCurrencies);
    app.get('/converter/:amount/:currency1/:currency2', this._converter);
    app.get('/login/', this._login);
    app.post('/save/', this._Save);
    app.get('/', authorization.checkAuthenticated, this._goHome);

    // aca empieza el cambio
    app.get('/auth/google/', passport.authenticate('google', {
        scope: ['email', 'profile']
      }));

    app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

     app.post("/logout", (req,res) => {
      req.logOut(err=>console.log(err));
      res.redirect("/login");
   })
   
    // Start server
    app.listen(3000, () => console.log('Listening on port 3000'));
  }

  async _login(req, res) {
    res.sendFile(path.join(__dirname, "public/login.html"));
  }

  async _goHome(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
  }

async _getCurrencies(req, res){
  const host = 'api.frankfurter.app';
  return fetch(`https://${host}/currencies`)
  .then(response => response.json())
  .then(data => {
    res.json(data); 
  })
}

async _converter(req, res){
  const host = 'api.frankfurter.app';
  return fetch(`https://${host}/latest?amount=${req.params.amount}&from=${req.params.currency1}&to=${req.params.currency2}`)
  .then(response => response.json())
  .then(val =>{
    res.json(val);
  })
}

async _Save(req, res) {
  const query = { conversion: req.body.conversion.toLowerCase() };
  const update = { $set: { definition: req.body.definition } };
  const params = { upsert: true };
  const collection = db.collection("converter");
  await collection.updateOne(query, update, params);
  res.json({ success: true });
}

}

new ConverterBackendServer();