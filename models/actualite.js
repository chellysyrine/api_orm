const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');
var Admin=require('./admin')


module.exports=bookshelf.Model.extend({
    tableName:'actualites',

    admin:function(){
        return this.belongsTo(Admin,'id_admin')   
     }
    })
