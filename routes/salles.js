var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Salle=require('../models/salle')

var Salles = bookshelf.Collection.extend({
  model: Salle
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Salles.forge()
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
    Salle.forge({
      "nom_salle":req.body.nom_salle,
      "etage_salle":req.body.etage_salle,
      
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
    Salle.forge({id: req.params.id})
    .fetch()
    .then(function (salle) {
      if (!salle) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: salle.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Salle.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (salle) {
      salle.save({
        "nom_salle":req.body.nom_salle || salle.get('nom_salle'),
        "etage_salle":req.body.etage_salle || salle.get('etage_salle'),
        
       
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
    Salle.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (salle) {
      salle.destroy()
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
