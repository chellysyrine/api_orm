const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');
var Seance=require('./seance');
var Etudiant=require('./etudiant');


module.exports=bookshelf.Model.extend({
    tableName:'annee',
    seance : function(){
      return this.hasMany(Seance );
     },
     etudiants:function(){
        return this.belongsToMany(Etudiant,'paiement');
      },
    




    })
  
  