var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Paiement=require('../models/paiement')

var Paiements = bookshelf.Collection.extend({
  model: Paiement
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Paiements.forge()
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
    Paiement.forge({
      "mode":req.body.mode,
      "montant":req.body.montant,
      "date":req.body.date,
      "id_etudiant":req.body.id_etudiant,
      "id_annee":req.body.id_annee
      
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
    Paiement.forge({id: req.params.id})
    .fetch()
    .then(function (paiement) {
      if (!paiement) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: paiement.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Paiement.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (Paiement) {
      Paiement.save({
        "mode":req.body.mode || Paiement.get('mode'),
        "montant":req.body.montant || Paiement.get('montant'),
        "date":req.body.date || Paiement.get('date'),
        "id_etudiant":req.body.date || Paiement.get('id_etudiant'),
        "id_annee":req.body.date || Paiement.get('id_annee'),



       
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
    Paiement.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (paiement) {
      paiement.destroy()
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
