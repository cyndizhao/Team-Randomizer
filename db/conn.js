const pgp = require('pg-promise')();

const db = pgp({
  host:'localhost',
  database:'teambuilder'
})

module.exports = db;
