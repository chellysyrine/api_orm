var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Niveau=require('../models/niveau')

var Niveaus = bookshelf.Collection.extend({
  model: Niveau
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Niveaus.forge()
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
    Niveau.forge({
      "description":req.body.description,
      "id_specialite":req.body.id_specialite,
      
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
    Niveau.forge({id: req.params.id})
    .fetch()
    .then(function (niveau) {
      if (!niveau) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: niveau.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Niveau.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (niveau) {
      niveau.save({
        "description":req.body.description || niveau.get('description'),
        "id_specialite":req.body.id_specialite || niveau.get('id_specialite'),
       
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
    Niveau.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (niveau) {
      niveau.destroy()
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
