const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')

const config = require('./config')

exports.local = passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = user => {
    return jwt.sign(user, config.secretkey, { expiresIn: 7200 })
}

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secretkey

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload:', jwt_payload)
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) {
                    return done(err, false)
                } else if (user) {
                    return done(null, user)
                } else {
                    return done(null, false) //no user was found, can also add code to setup new user account
                }
            })
        }
    )
)

exports.verifyUser = passport.authenticate('jwt', {session: false})