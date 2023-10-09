const express=require('express');
const userController = require('../controller/userController');
const route=express();

const bodyParser=require('body-parser');

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended:true}))

//----------session creating --------------------------------
const auth=require('../middleware/auth')
const session = require('express-session');
const config=require('../config/config')

route.use(session({
   
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:true
}))



//----------route creation -------------------------------- 
route.get('/register',auth.isLogout,userController.loadRegister)
route.post('/register',userController.insertUser)
route.get('/',auth.isLogout,userController.loginLoad)
route.get('/login',auth.isLogout,userController.loginLoad)
route.post('/login',userController.verifyLogin)
route.get('/home',auth.isLogin,userController.loadHome)
route.get('/logout',auth.isLogin,userController.userLogout)

module.exports=route;



