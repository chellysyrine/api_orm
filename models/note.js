const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');
var Etudiant=require('./etudiant');


module.exports =bookshelf.Model.extend({
    tableName:'note',
   
    etudiants:function(){
      return this.belongsTo(Etudiant, "id_etudiant");
    },})
  
    
  