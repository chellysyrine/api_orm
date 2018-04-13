var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Note=require('../models/note')

var Notes = bookshelf.Collection.extend({
  model: Note
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Notes.forge()
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
    Note.forge({
      "valeur":req.body.valeur,
      "id_etudiant":req.body.id_etudiant,
      
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
    Note.forge({id: req.params.id})
    .fetch()
    .then(function (note) {
      if (!note) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: note.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Note.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (note) {
      note.save({
        "valeur":req.body.valeur || note.get('valeur'),
        "id_etudiant":req.body.id_etudiant || note.get('id_etudiant'),
       
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
    Note.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (note) {
      note.destroy()
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
