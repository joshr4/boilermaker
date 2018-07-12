const passport = require('passport')
const router = require('express').Router()
const NestStrategy = require('passport-nest').Strategy
const {
  User
} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.NEST_CLIENT_ID || !process.env.NEST_CLIENT_SECRET) {

  console.log('Nest client ID / secret not found. Skipping Nest OAuth.')

} else {

  // const googleConfig = {
  //   clientID: process.env.GOOGLE_CLIENT_ID,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   callbackURL: process.env.GOOGLE_CALLBACK
  // }

  const strategy = new NestStrategy({
    clientID: process.env.NEST_ID,
    clientSecret: process.env.NEST_SECRET,
    tokenURL: 'https://api.home.testc.nestlabs.com/oauth2/access_token',
    authorizationURL: 'https://home.testc.nestlabs.com/login/oauth2'
  })

  passport.use(strategy)

  // passport.serializeUser(function (user, done) {
  //   done(null, user);
  // });

  // passport.deserializeUser(function (user, done) {
  //   done(null, user);
  // });

  // app.use(cookieParser('cookie_secret_shh'));
  // app.use(bodyParser());
  // app.use(session({
  //   secret: 'session_secret_shh'
  // }));
  // app.use(passport.initialize());
  // app.use(passport.session());
  router.get('/', passport.authenticate('nest'));
  router.get('/callback',
    passport.authenticate('nest', {}),
    function (req, res) {

    }
  );

}
