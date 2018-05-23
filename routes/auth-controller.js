'use strict';

const express = require('express');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

const jwt = require('jwt-simple');
const securityConfig = require('../config/security-config');
var Etudiant = require('../models/etudiant');
const passport = require('passport');


const router = express.Router();

router.post('/login', (req, res) => {
    const email = req.body.email;
    var password = req.body.password;
    Promise.coroutine(function* () {
        const etudiant = yield Etudiant.where('email', email).fetch();
        console.log(etudiant.attributes.password)
        bcrypt.compare(password, etudiant.attributes.password, function (err, valid) {
            console.log(valid)
            if (valid) {
                const token = jwt.encode(etudiant.omit('password'), securityConfig.jwtSecret);
                res.json({
                    success: true,
                    token: `jwt ${token}`,
                    id:etudiant.attributes.id
                });
            } else {
                res.json({
                    success: false,
                    msg: 'Authentication failed'
                });
            }
        });


    })().catch(err => console.log(err));
});




module.exports = router;