const Express = require('express');
const router = Express.Router();
const shuffle = require('shuffle-array');
    // collection = [1,2,3,4,5];
const db = require('../db/conn');


const countTeam = function(arr){
  let namearray = arr[0].split(",");
  shuffle(namearray);
  let result = [];
  let count;
  if (parseInt(arr[1]) === 2){
    count = parseInt(arr[2]);
  }else if (parseInt(arr[1]) === 1){
    count = Math.ceil(namearray.length / parseInt(arr[2]));
  }
  if (namearray.length < count){
    return "Number of teams must be between 1 and the number of members";
  }
  for (let i = 0; i< count; i ++){
    result.push([]);
    console.log(result);
  }

  while(namearray.length > 0){
    for (let item of result){
      if (namearray.length > 0){
      item.push(namearray.shift());
      }
    }
  }

  return result;//[[a,b,e], [c,d]]
}

//***********show database!
router.get('/allrequest', function (req, res, next) {
  db.query(`SELECT * FROM teaminfo ORDER BY id`)
    .then(function (teaminfo) {
      res.render('teaminfo/index', {teaminfo: teaminfo});
    })
    .catch(function (err) {
        res.send(err);
    });
})
//**********end of showing database!

router.get('/', function(req, res, next){
  const {names = '',  choice= '', number = '', team =[]} = req.cookies;
  res.render('pick', {team:team, names:names , choice:choice, number:number} );

  // res.render('pick', {team:null} );
})


router.post('/', function (req, res, next) {
  console.log(req.body);
  const info = Object.values(req.body);
  // info[0]
  // the string of names
  // info[1]
  // choice "1" or "2"
  // info[2]
  // number we choose
  const team = countTeam(info);
  // [ 'a', 'c', 'e', 'g' ], [ 'b', 'd', 'f' ] ]
  res.cookie('names', info[0]);
  res.cookie('choice', info[1]);
  res.cookie('number', info[2]);
  res.cookie('team', team);

  // res.render('pick', {team:team}); if you do not have cookies, then redirect does not work

// //*************add database
  db.query(`
INSERT INTO teaminfo (name, choice, number) VALUES ($1, $2, $3)  `, info
  ).then(function () {
    // res.redirect('/teaminfo') //go to localhost:5001/posts
    console.log("database insert");
    res.redirect('/');

  }).catch(function (err) { res.send(err) })
//**********end of adding database
})

module.exports = router;
