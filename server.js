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

    app.get('/login/', this._login);
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
    app.listen(3001, () => console.log('Listening on port 3001'));
  }

  async _login(req, res) {
    res.sendFile(path.join(__dirname, "public/login.html"));
  }

  async _goHome(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
  }
}

new ConverterBackendServer();