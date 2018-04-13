var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Classe=require('../models/classe')

var Classes = bookshelf.Collection.extend({
  model: Classe
});

router.route('/')
// fetch all classes
  .get(function (req, res) {
      Classes.forge()
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
  // create a classe
  .post(function (req, res) {
    Classe.forge({
      "nom":req.body.nom,
      "id_niveau":req.body.id_niveau,
      
    })
    .save()
    .then(function (classe) {
      res.json({error: false, data: {id: classe.get('id')}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    }); 
  });
router.route('/:id')
  // fetch classe
  .get(function (req, res) {
    Classe.forge({id: req.params.id})
    .fetch()
    .then(function (classe) {
      if (!classe) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: classe.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update classe details
  .put(function (req, res) {
    Classe.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (classe) {
      classe.save({
        "nom":req.body.nom || classe.get('nom'),
        "id_niveau":req.body.id_niveau || classe.get('id_niveau'),
       
      })
      .then(function () {
        res.json({error: false, data: {message: 'classe details updated'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // delete a classe
  .delete(function (req, res) {
    Classe.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (classe) {
      classe.destroy()
      .then(function () {
        res.json({error: true, data: {message: 'classe successfully deleted'}});
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
