'use strict'

const passport = require('passport');
const dbConfig = require('./config');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const securityConfig = require('./security-config');
var Etudiant=require('../models/etudiant')

module.exports = function() {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    
    opts.secretOrKey = securityConfig.jwtSecret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        Etudiant.where('id', jwt_payload.id).fetch()
            .then(etudiant => etudiant ? done(null, etudiant) : done(null, false))
            .catch(err => done(err, false));
    }));
};