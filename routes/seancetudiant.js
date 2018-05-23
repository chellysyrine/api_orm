
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










router.route('/seance/:id')
.get(function (req, res) {
Seances.query(function (qb) {
  qb.count('seance.id_classe AS nombredeseances');
 // qb.groupBy('id_matier');
  qb.innerJoin('etudiant','etudiant.id_classe','seance.id_classe');
  qb.where('etudiant.id',req.params.id);
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

  router.route('/seancebymatiere/:id')
.get(function (req, res) {
Seances.query(function (qb) {
  qb.count('seance.id_classe AS nombredeseances');
  qb.groupBy('id_matier');
  qb.innerJoin('etudiant','etudiant.id_classe','seance.id_classe');
  qb.innerJoin('matiere','matiere.id','seance.id_matier');
  qb.where('etudiant.id',req.params.id).select('nom');
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
