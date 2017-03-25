const db = require('./conn')

db.query(`
  CREATE TABLE teaminfo(
    id SERIAL,
    name VARCHAR(255),
    choice NUMERIC,
    number NUMERIC
  )
`).then(function(){
  console.log('Created table teaminfo!');
  process.exit();
}).catch(function(error){
  console.error(error);
  process.exit();
})
