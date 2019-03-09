const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const credentials = require('./credentials.json')
const mode = require("./mode");

passport.serializeUser((id, done)=>{
  done(null, id);
});

passport.deserializeUser((id, done)=>{
    // Add Security Here
    done(null, id);
});

passport.use(
  new GoogleStrategy({
  //options for the strategy
  callbackURL: credentials.web.redirect_uris[mode.env],
  clientID: credentials.web.client_id,
  clientSecret: credentials.web.client_secret
}, (accessToken, refreshToken, profile, done)=>{
    //passport callback function
    console.log("Profile Id Received, look to save email");
    done(null, profile.id);
  })
);
