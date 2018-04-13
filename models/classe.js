const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');
var Seance=require('./seance');
var Etudiant=require('./etudiant');
var Niveau=require('./niveau');


module.exports =bookshelf.Model.extend({
    tableName:'classe',
  
    seances : function(){
      return this.hasMany(Seance);
     },
   
    etudiants:function(){
      return this.hasMany(Etudiant);
    },
    niveau : function(){
     return this.belongsTo(Niveau ,'id_niveau');
    }
  })
  