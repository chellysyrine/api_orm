const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');
var Seance=require('./seance');
var Note=require('./note');
var Unite=require('./unite');



module.exports=bookshelf.Model.extend({
    tableName:'matiere',
  
    seance : function(){
      return this.hasMany(Seance);
     },
  
     note: function () {
      return this.belongsTo(Note,'id_note');
    },
    unite: function () {
      return this.belongsTo(Unite,'id_unite');
    },
    
  })