// Funcion de Conmutador de Entidades del Api
var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportJWT = require('passport-jwt');

var extractJWT = passportJWT.ExtractJwt;
var strategyJWT = passportJWT.Strategy;

var userRoute = require('./user');
var {
    pub,
    priv
} = require('./map');

/**************************************************************************/

passport.use(new strategyJWT({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, (payload, next) => {
    var user = payload;
    return next(null, user);
}))

/**************************************************************************/
// public pages
router.use("/user", userRoute);
router.use("/map", pub);
router.get('/', (req, res, next) => {
    res.status(200).json({"version": "API ALFA ULTRA EARLY ACCESS"})
});

/**************************************************************************/
const jwtAuthMiddleware = passport.authenticate('jwt', {session: false});
// private pages must login for jwt auth
router.use("/map", jwtAuthMiddleware, priv);

router.get('/version', jwtAuthMiddleware, function (req, res) {
    res.status(200).json({"version": "API v1.0 FULL AUTH WORKING"});
});


module.exports = router;
