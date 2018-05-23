

var express = require('express');
var router = express.Router();
const bookshelf = require('../config/bookshelf-instance');
const securityConfig = require('../config/security-config');
var Absence=require('../models/absence');
var Seance = require('../models/seance');
var Matiere=require('../models/matiere');


var Absences = bookshelf.Collection.extend({
  model: Absence
});
var Seances = bookshelf.Collection.extend({
  model: Seance
});
var Matieres = bookshelf.Collection.extend({
  model: Matiere
});


  
router.route('/:id')
  .get(function (req, res) {
  Absences.query(function (qb) {
    qb.count('id_etudiant AS nombreTotal');
    qb.where('id_etudiant',req.params.id )
          }).fetch()
      .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
        console.log(true)
  
      })
      .catch(function (err) {
        console.log(err)
        res.status(500).json({error: true, data: {message: err.message}});
      });
    })
    router.route('/date/:id')
    .get(function (req, res) {
    Absences.query(function (qb) {
      qb.where('id_etudiant',req.params.id).select('date_absence')
            }).fetch()
        .then(function (collection) {
          res.json({error: false, data: collection.toJSON()});
          console.log(true)
    
        })
        .catch(function (err) {
          console.log(err)
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })

      router.route('/nom/:id')
    .get(function (req, res) {
    Matieres.query(function (qb) {
      
      //qb.count('id_matier AS absence par matiere');
      //qb.groupBy('id_matier');
      qb.innerJoin('seance','seance.id_matier','matiere.id');
      qb.innerJoin('absence','absence.id_seance','seance.id');
      qb.where('id_etudiant',req.params.id) 
      qb.select('nom ' ,'date_absence ', 'seance.date_debut', 'seance.date_fin');
      qb.orderBy("nom");
      
            }).fetch()
        .then(function (collection) {
        
          let returnedData = {};
          collection.toJSON().forEach(element => {
            //console.log(element);
            returnedData[element.nom] = [];
          });
          collection.toJSON().forEach(element => {
            console.log(element);
            returnedData[element.nom].push(element.date_absence
            );
            active:false;
          })
          //console.log(returnedData)
          res.json({error: false, data: returnedData});
          console.log(true)
    
        })
        .catch(function (err) {
          console.log(err)
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })


      router.route('/nombre/:id')
    .get(function (req, res) {
    Matieres.query(function (qb) {
      
      qb.count('id_matier AS absence par matiere');
      qb.groupBy('id_matier');
      qb.innerJoin('seance','seance.id_matier','matiere.id');
      qb.innerJoin('absence','absence.id_seance','seance.id');
      qb.where('id_etudiant',req.params.id) 
      qb.select('nom');
      //qb.orderBy("nom");
      
            }).fetch()
        .then(function (collection) {
          // collection.forEach(element => {
          //   if element.nom
          // });
          res.json({error: false, data: collection.toJSON()});
          console.log(true)
    
        })
        .catch(function (err) {
          console.log(err)
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })



      router.route('/dateab/:id')
    .get(function (req, res) {
    Absences.query(function (qb) {
      qb.innerJoin('seance','seance.id','absence.id_seance');
      qb.innerJoin('matiere','matiere.id','seance.id_matier');
      qb.where('id_etudiant',req.params.id);
      qb.groupBy('matiere.nom', 'matiere.id')
      qb.select('matiere.nom','absence.date_absence');

            }).fetch()
        .then(function (collection) {
          res.json({error: false, data: collection.toJSON()});
          console.log(true)
    
        })
        .catch(function (err) {
          console.log(err)
          res.status(500).json({error: true, data: {message: err.message}});
        });
      })


      


   
  
module.exports=router;

