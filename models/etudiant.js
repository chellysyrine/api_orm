'use strict'

const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');

var Seance=require('./seance');
var Note=require('./note');
var Classe=require('./classe');
var Annee=require('./annee');



module.exports =bookshelf.Model.extend({
    tableName: 'etudiant',
  
    classe: function () {
      return this.belongsTo(Classe, 'id_classe');
    },
    seances : function(){
      return this.belongsToMany(Seance,'absence');
     },
     annee : function(){
      return this.belongsToMany(Annee,'paiement');
     },
    note : function(){
      return this.hasMany(Note);
    },
    

//  initialize() {
//       this.on('saving', model => {
//           if (!model.hasChanged('password')) return;

//           return Promise.coroutine(function* () {
//               const salt = yield bcrypt.genSaltAsync(securityConfig.saltRounds);
//               const hashedPassword = yield bcrypt.hashAsync(model.attributes.password, salt);
//               model.set('password', hashedPassword);
//           })();
//       });
//   }
  
  })

  
