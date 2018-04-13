
var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Etudiant=require('../models/etudiant')

var Etudiants = bookshelf.Collection.extend({
  model: Etudiant
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Etudiants.forge()
    .fetch()
    .then(function (collection) {
      collection.toJSON().forEach(element => {
        console.log(element.firstName);
      });
      res.json({error: false, data: collection.toJSON()});
      console.log(true);

    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // create a user
  .post(function (req, res) {
    Etudiant.forge({
      "firstName":req.body.firstName,
      "lastName":req.body.lastName,
      "cin":req.body.cin,
      "date_naissance":req.body.date_naissance,
      "email":req.body.email,
      "password":req.body.password,
      "username":req.body.username,
      "id_classe":req.body.id_classe
    })
    .save()
    .then(function (user) {
      res.json({error: false, data: {id: user.get('id')}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    }); 
  });
router.route('/:id')
  // fetch user
  .get(function (req, res) {
    Etudiant.forge({id: req.params.id})
    .fetch()
    .then(function (user) {
      if (!user) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: user.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Etudiant.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (etudiant) {
      etudiant.save({
        "firstName":req.body.firstName || etudiant.get('firstName'),
        "lastName":req.body.lastName || etudiant.get('lastName'),
        "cin":req.body.cin || etudiant.get('cin'),
        "date_naissance":req.body.date_naissance|| etudiant.get('date_naissance'),
        "email":req.body.email || etudiant.get('email'),
        "password":req.body.password || etudiant.get('password'),
        "username":req.body.username || etudiant.get('username'),
      })
      .then(function () {
        res.json({error: false, data: {message: 'User details updated'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a user
  .delete(function (req, res) {
    Etudiant.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (etudiant) {
      etudiant.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'User successfully deleted'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });
  module.exports = router;
