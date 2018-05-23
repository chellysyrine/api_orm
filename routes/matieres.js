var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Matiere=require('../models/matiere');
var Unite=require('../models/unite')


var Matieres = bookshelf.Collection.extend({
  model: Matiere
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Matieres.forge()
    .fetch()
    .then(function (collection) {
      var result = [];
        var counter = 0;
        collection.toJSON().forEach((element, idx) => {
          result.push(element);
          Unite.forge({id: element.id_unite})
          .fetch()
          .then(function (unite) {
            if (!unite) {
              result[idx].unite = {}
                       counter = counter + 1;
            }
            else {
              result[idx].unite = unite.toJSON();
                     console.log(result);
                     counter = counter + 1;
            
                    }
                    if (counter === collection.toJSON().length) {
                      res.json({
                        error: false,
                        data: result
                      });
                     }
                    })
          
          .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
          });
        
        })


    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // create a user
  .post(function (req, res) {
    Matiere.forge({
      "nom":req.body.nom,
      "coefficient":req.body.coefficient,
      "type":req.body.type,
      "etat":req.body.etat,
      "id_note":req.body.id_note,
      "id_unite":req.body.id_unite
      
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
    Matiere.forge({id: req.params.id})
    .fetch()
    .then(function (matiere) {
      if (!matiere) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: matiere.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Matiere.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (matiere) {
      matiere.save({
        "nom":req.body.nom || matiere.get('nom'),
        "coefficient":req.body.coefficient || matiere.get('coefficient'),
        "type":req.body.type || matiere.get('type'),
        "etat":req.body.etat || matiere.get('etat'),
        "id_note":req.body.id_note || matiere.get('id_note'),
        "id_unite":req.body.id_unite || matiere.get('id_unite'),
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
    Matiere.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (matiere) {
      matiere.destroy()
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
