const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');
var Classe=require('./classe');
var Unite=require('./unite');
var Specialite=require('./specialite');





module.exports =bookshelf.Model.extend({
    tableName:'niveau',

    specialite:function(){
  return this.belongsTo(Specialite,'id_specialite')
    },


    classes:function(){

        return this.hasMany(Classe);  
    },

    unites:function(){
        return this.hasMany(Unite);
    }
  


})