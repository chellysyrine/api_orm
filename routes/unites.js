
var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Unite=require('../models/unite')

var Unites = bookshelf.Collection.extend({
  model: Unite
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Unites.forge()
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
    Unite.forge({
      "nom_module":req.body.nom_module,
      "credit":req.body.credit,
      "coefficient":req.body.coefficient,
      "id_niveau":req.body.id_niveau,
     
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
    Unite.forge({id: req.params.id})
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
    Unite.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (unite) {
      unite.save({
        "nom_module":req.body.nom_module || unite.get('nom_module'),
        "credit":req.body.credit || unite.get('credit'),
        "coefficient":req.body.coefficient || unite.get('coefficient'),
        "id_niveau":req.body.id_niveau|| unite.get('id_niveau'),
        
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
    Unite.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (unite) {
      unite.destroy()
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
