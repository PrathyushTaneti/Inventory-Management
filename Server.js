const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db;
var s;

MongoClient.connect('mongodb://localhost:27017/App_Data',{ useUnifiedTopology: true },(err, database) => {
    if(err) return console.log(err)
    db = database.db('App_Data')
    app.listen(5050,() => {
        console.log('Listening at port number 5050')
    })
})

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req,res) =>{
    db.collection('car_collections').find().toArray( (err,result) => {
        if(err) return console.log(err)
    console.log(result);
    res.render('homepage.ejs', {data : result})
    })
})

app.get('/create',(req,res)=> {
    res.render('add.ejs')
})

app.get('/updatePage',(req,res)=> {
    res.render('update.ejs')
})

app.get('/deleteproduct',(req,res)=> {
    res.render('delete.ejs')
})

app.post('/Adddata',(req,res) => {
db.collection('car_collections').save(req.body, (err,result) => {
    if(err) return console.log(err)
res.redirect('/')

})
})

app.post('/update',(req,res) => {
   
    db.collection('car_collections').updateOne({Engine:req.body.id},{$set:{Number:req.body.stock}})
    console.log("1 Stock Updated")
    res.redirect("/");

    })


app.post('/delete',(req,res) => {
    db.collection('car_collections').findOneAndDelete({Engine:req.body.id},(err,result)=>{
        if(err)
        return console.log(err)
        res.redirect('/')
    })
})



