const express = require('express');
const app = express();
const bp = require('body-parser')
app.use(bp.urlencoded({extended:true}));
app.use(express.static(__dirname ));
app.set('view engine', 'ejs');
app.get('/', async(req, res) =>{
    res.render('index')

})
app.listen(3000,()=>{
    console.log("listening on http://localhost:3000");
})
