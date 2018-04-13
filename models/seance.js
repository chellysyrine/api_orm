const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');
var Etudiant=require('./etudiant');
var Classe=require('./classe');
var Matiere=require('./matiere');
var Salle=require('./salle');
var Annee=require('./annee');

module.exports =bookshelf.Model.extend({
    tableName:'seance',
   
    etudiants:function(){
      return this.belongsToMany(Etudiant,'absence');
    },
  
    classe: function () {
      return this.belongsTo(Classe,'id_classe');
  },
   matiere: function () {
    return this.belongsTo(Matiere,'id_matier');
  },
   salle: function () {
    return this.belongsTo(Salle,'id_salle');
  },
   annee: function () {
    return this.belongsTo(Annee,'id_annee');
  },
  })