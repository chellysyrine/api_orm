


const dbConfig = require('./config');
const knex = require('knex')(dbConfig);

module.exports = require('bookshelf')(knex);
