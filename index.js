var express = require('express')
var path = require('path')

var app = express()

var http = require('http')
http = http.Server(app)

var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// connect to db 
mongoose.connect('mongodb://matamalaortiz:claudiaschiffer@ds019976.mlab.com:19976/matamala');

var db = mongoose.connection;

db.on('open', function(){
	console.log('conectado')

})

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
		type: String,
		trim: true // Trim corta los Spaces del string 
	}
})

var User = mongoose.model('User', userSchema) // Crea una collection 

// MIDDLEWARE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine','pug')

app.use(express.static(path.join(__dirname, 'public')))


app.get('/', function(req, res){

	var name = "Alejandro"

	// get name from database

	// add first name and last name

	// set it to a variable

	// pass that vairable to the template

	res.render("index.pug", {myname:name})
})

app.get('/user', function(req, res){
 	//save user to db

 	var newUser = new User({
 		name: 'Paula',
 	})

 	newUser.save(function(err, result){
 		
 		if(err){
 			console.log(err)
 			res.send('Error saving your name')
 		} else {
 			res.send('Save to Database')
 		}

 	})

})

app.get('/all', function(req,res){
 	//show me all currently saved users 
 	User.find({}, function(err, results){ 

 		if(err) {
 			res.send('cannot find any user')
 		}
 		return res.json(
 			{
 				data: results,
 			}
 		)

 	})

})

app.get('/filter', function(req,res){
 	//show me all currently saved users 
 	User.find({name:'Paula'}, function(err, result){

 		return res.json(
 			{
 			data: result,
 			}
 		)	
 	})
})

app.post('/newuser', function(req, res, next){

	var newname = req.body.username

	var newuser = new User({
		name: newname
	})

	newuser.save(function(err, result){
		
		if(err){
			res.send('not saved')
		}else {
			res.send('saved')
		}
	})
})

app.get('/about', function(req, res){

	var list = ["chris","leslie","paula","jenny","ondina","patrick"]
	var meeting = false;

	res.render("about.pug", {namelist: list, is_meeting_on: meeting})
})

app.get('/contact', function(req, res){

	res.send("contact page")
})

var server = http.listen(3000, function(){

	console.log("I am listening on port 3000")
})