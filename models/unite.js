const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');
var Matiere=require('./matiere')
var Niveau=require('./niveau');


module.exports=bookshelf.Model.extend({
    tableName:'unite',


    matiere: function () {
        return this.hasMany(Matiere);
      },


    niveau : function(){
        return this.belongsTo(Niveau ,'id_niveau');
       }



})