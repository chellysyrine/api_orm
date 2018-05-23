var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Actualite=require('../models/actualite')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
     cb(null, './uploads/');
    },
   filename: function(req, file, cb) {
     cb(null, new Date().toISOString() + file.originalname);
   }
  });

  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
   };
  const upload = multer({
    storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 5
     },
     fileFilter: fileFilter
    });

var Actualites = bookshelf.Collection.extend({
  model: Actualite
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Actualites.forge()
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
  .post(upload.single('actImage'),function (req, res) {
      console.log(req.file);
    Actualite.forge({
      "titre":req.body.titre,
      "description":req.body.description,
      "date":req.body.date,
      "id_admin":req.body.id_admin,
      "actImage":req.file.path,
      
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
    Actualite.forge({id: req.params.id})
    .fetch()
    .then(function (actualite) {
      if (!actualite) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: actualite.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Actualite.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (Actualite) {
      Actualite.save({
        "titre":req.body.titre || actualite.get('titre'),
        "description":req.body.description || actualite.get('description'),
        "date":req.body.date || actualite.get('date'),
        "id_admin":req.body.id_admin || actualite.get('id_admin')
       
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
    Actualite.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (actualite) {
      actualite.destroy()
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
