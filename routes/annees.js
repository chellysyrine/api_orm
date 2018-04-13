var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Annee=require('../models/annee')

var Annees = bookshelf.Collection.extend({
  model: Annee
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Annees.forge()
    .fetch()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
      console.log(true)

    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // create a user
  .post(function (req, res) {
    Annee.forge({
      "description":req.body.description,
      "date_debut":req.body.date_debut,
      "date_fin":req.body.date_fin,
      
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
    Annee.forge({id: req.params.id})
    .fetch()
    .then(function (annee) {
      if (!annee) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: annee.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Annee.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (annee) {
      annee.save({
        "description":req.body.description || annee.get('description'),
        "date_debut":req.body.date_debut || annee.get('date_debut'),
        "date_fin":req.body.date_fin || annee.get('date_fin'),
       
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
    Annee.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (annee) {
      annee.destroy()
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
