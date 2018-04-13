var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Specialite=require('../models/specialite')

var Specialites = bookshelf.Collection.extend({
  model: Specialite
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Specialites.forge()
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
    Specialite.forge({
      "description":req.body.description,
      "type_plan":req.body.type_plan,
      "description_plan":req.body.description_plan,
      
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
    Specialite.forge({id: req.params.id})
    .fetch()
    .then(function (specialite) {
      if (!specialite) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: specialite.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Specialite.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (specialite) {
      specialite.save({
        "description":req.body.description || specialite.get('description'),
        "type_plan":req.body.type_plan || specialite.get('type_plan'),
        "description_plan":req.body.description_plan || specialite.get('description_plan'),
       
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
    Specialite.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (specialite) {
      specialite.destroy()
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
