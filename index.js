const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/userMangementSystem');
let db=mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (err) => {
    console.log(err);
});
//----------------------------------------------------------------
const express = require('express');
const app = express();
const path=require('path');
const nocache = require('nocache');


app.use(nocache());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));

//-----------user route--------------------------------

const route= require('./routes/userRoutes');
app.use('/',route)

//---------------admin route--------------------------------    
const admin=require('./routes/adminRoute');
app.use('/admin',admin);

app.listen(3100,()=>{
    console.log("http://localhost:3100");
})