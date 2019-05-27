const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs')


var db
var url = 'mongodb://localhost:27017';
MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('dev') // whatever your database name is

app.listen(3000,()=>{
console.log('listening on 3000')
});


//CRUD Handlers
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'))
	
app.get('/',(req,res)=>{
	db.collection('quotes').find().toArray((err,results)=>
{
if (err) return console.log(err)
 res.render('index.ejs', {quotes: results})
})

	
})

app.get('/create',(req,res)=>{
	return res.sendFile(__dirname+ '/create.html');
})

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.post('/quotes',(req,res)=>{
   db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
})



