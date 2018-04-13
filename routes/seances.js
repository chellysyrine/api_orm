var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Seance = require('../models/seance');
var Classe = require('../models/classe')
var Matiere=require('../models/matiere')


var Seances = bookshelf.Collection.extend({
  model: Seance
});

router.route('/')
  // fetch all users
  .get(function (req,res) {
    Seances.forge()
      .fetch()
      .then(function (collection) {
        var result = [];
        var counter = 0;
        collection.toJSON().forEach((element, idx) => {
          result.push(element);

          Classe.forge({
              id: element.id_classe
            })
            .fetch()
            .then(function (classe) {
              if (!classe) {
                result[idx].classe = {}
                counter = counter + 1;
              } else {
                //console.log(classe.toJSON());
                result[idx].classe = classe.toJSON();
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
              res.status(500).json({
                error: true,
                data: {
                  message: err.message
                }
              });
            });



            Matiere.forge({id: element.id_matier})
            .fetch()
            .then(function (matiere) {
              if (!matiere) {
                result[idx].matiere = {}
                  counter = counter + 1;
              }
              else {
                result[idx].matiere = matiere.toJSON();
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


            //console.log(result[idx])
        });
        
        console.log(counter);
      

      })
      .catch(function (err) {
        console.log(err)
        res.status(500).json({
          error: true,
          data: {
            message: err.message
          }
        });
      });
  })
  // create a user
  .post(function (req, res) {
    Seance.forge({
        "date_debut": req.body.date_debut,
        "date_fin": req.body.date_fin,
        "id_classe": req.body.id_classe,
        "id_matier": req.body.id_matier,
        "id_salle": req.body.id_salle,
        "id_annee": req.body.id_annee,

      })
      .save()
      .then(function (user) {
        res.json({
          error: false,
          data: {
            id: user.get('id')
          }
        });
      })
      .catch(function (err) {
        res.status(500).json({
          error: true,
          data: {
            message: err.message
          }
        });
      });
  });
router.route('/:id')
  // fetch user
  .get(function (req, res) {
    Seance.forge({
        id: req.params.id
      })
      .fetch()
      .then(function (seance) {
        if (!seance) {
          res.status(404).json({
            error: true,
            data: {}
          });
        } else {
          res.json({
            error: false,
            data: seance.toJSON()
          });
        }
      })
      .catch(function (err) {
        res.status(500).json({
          error: true,
          data: {
            message: err.message
          }
        });
      });
  })
  // update user details
  .put(function (req, res) {
    Seance.forge({
        id: req.params.id
      })
      .fetch({
        require: true
      })
      .then(function (seance) {
        seance.save({
            "date_debut": req.body.date_debut || seance.get('date_debut'),
            "date_fin": req.body.date_fin || seance.get('date_fin'),
            "id_classe": req.body.id_classe || seance.get('id_classe'),
            "id_matier": req.body.id_matier || seance.get('id_matier'),
            "id_salle": req.body.id_salle || seance.get('id_salle'),
            "id_annee": req.body.id_annee || seance.get('id_annee'),

          })
          .then(function () {
            res.json({
              error: false,
              data: {
                message: 'User details updated'
              }
            });
          })
          .catch(function (err) {
            res.status(500).json({
              error: true,
              data: {
                message: err.message
              }
            });
          });
      })
      .catch(function (err) {
        res.status(500).json({
          error: true,
          data: {
            message: err.message
          }
        });
      });
  })
  // delete a user
  .delete(function (req, res) {
    Seance.forge({
        id: req.params.id
      })
      .fetch({
        require: true
      })
      .then(function (seance) {
        seance.destroy()
          .then(function () {
            res.json({
              error: true,
              data: {
                message: 'User successfully deleted'
              }
            });
          })
          .catch(function (err) {
            res.status(500).json({
              error: true,
              data: {
                message: err.message
              }
            });
          });
      })
      .catch(function (err) {
        res.status(500).json({
          error: true,
          data: {
            message: err.message
          }
        });
      });
  });
module.exports = router;