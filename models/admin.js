const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');
var Actualite=require('./actualite');
var Noteinfo=require('./noteinfo')
module.exports=bookshelf.Model.extend({
    tableName:'admin',

    actualite:function(){
        return this.hasMany(Actualite); 
     },
     noteinfo:function(){
         return this.hasMany(Noteinfo);
     }


    })
