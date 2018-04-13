const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');

var Niveau=require('./niveau')

module.exports =bookshelf.Model.extend({
    tableName:'specialite',
  

    niveau:function(){
        return this.hasMany(Niveau);
    }



})




