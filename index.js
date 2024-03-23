const express = require('express');
const app = express();
const bp = require('body-parser')
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://httwarriors12:akshat@cluster0.n9sknas.mongodb.net/hacktt';
mongoose.connect(mongoDB);
// var db = mongoose.connection;
var userschema = mongoose.Schema({
    name : String,
    phno: String ,
    email : String,
    weight : Number,
    height :Number ,
    Age: Number,
    
});

app.use(bp.urlencoded({extended:true}));
app.use(express.static(__dirname ));
app.set('view engine', 'ejs');
var user = mongoose.model('user',userschema);
var nu = new user({name:"fhkgf",email:"ghj",phno:"985585"});
nu.save();
const { auth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'ouN2IFII0oE7eWZF3UgPaaaXuLe6nnK4',
  issuerBaseURL: 'https://dev-ktrnto3xhx5pfgg2.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
const { requiresAuth } = require('express-openid-connect');
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.get('/profile', requiresAuth(), async(req, res) => {
    var datar = req.oidc.user;
    //res.send(datar.email);
    
        console.log(datar.email);
    let a=await user.find({email:datar.email});
    console.log(a);
    res.render('index.ejs',{a:a}) 
  });

app.listen(3000,()=>{
    console.log("listening on http://localhost:3000");
})
