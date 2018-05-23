var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Noteinfo=require('../models/noteinfo')


var Noteinfos = bookshelf.Collection.extend({
  model: Noteinfo
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Noteinfos.forge()
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
      
    Noteinfo.forge({
      "titre":req.body.titre,
      "description":req.body.description,
      "date":req.body.date,
      "id_admin":req.body.id_admin,
      
      
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
    Noteinfo.forge({id: req.params.id})
    .fetch()
    .then(function (Noteinfo) {
      if (!Noteinfo) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: Noteinfo.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Noteinfo.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (Noteinfo) {
      Noteinfo.save({
        "titre":req.body.titre || Noteinfo.get('titre'),
        "description":req.body.description || Noteinfo.get('description'),
        "date":req.body.date || Noteinfo.get('date'),
        "id_admin":req.body.id_admin || Noteinfo.get('id_admin')
       
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
    Noteinfo.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (Noteinfo) {
      Noteinfo.destroy()
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
