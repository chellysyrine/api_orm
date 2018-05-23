var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Absence=require('../models/absence');
var Etudiant=require('../models/etudiant');
var Seance = require('../models/seance');




var Absences = bookshelf.Collection.extend({
  model: Absence
});

router.route('/')
// fetch all users
  .get(function (req, res) {
      Absences.forge()
    .fetch()
    .then(function (collection) {
        var result = [];
        var counter = 0;
        collection.toJSON().forEach((element, idx) => {
          result.push(element);

          Seance.forge({id: element.id_seance})
               .fetch()
               .then(function (seance) {
                 if (!seance) {
                   result[idx].seance = {}
                 }
                 else {
                   result[idx].seance = seance.toJSON();
                   console.log(result);
                 }

          Etudiant.forge({id: element.id_etudiant})
                 .fetch()
                 .then(function (etudiant) {
                   if (!etudiant) {
                     result[idx].etudiant = {}
                       counter = counter + 1;
                   }
                   else {
                     result[idx].etudiant = etudiant.toJSON();
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
    Absence.forge({
      "date_absence":req.body.date_absence,
      "id_seance":req.body.id_seance,
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
    Absence.forge({id: req.params.id})
    .fetch()
    .then(function (absence) {
      if (!absence) {
        res.status(404).json({error: true, data: {}});
      }
      else {
        res.json({error: false, data: absence.toJSON()});
      }
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  // update user details
  .put(function (req, res) {
    Absence.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (Absence) {
      absence.save({
        "date_absence":req.body.date_absence || absence.get('date_absence'),
        "id_seance":req.body.id_seance || absence.get('id_seance'),
        "id_etudiant":req.body.id_etudiant || absence.get('id_etudiant'),
       
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
    Absence.forge({id: req.params.id})
    .fetch({require: true})
    .then(function (absence) {
      absence.destroy()
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

