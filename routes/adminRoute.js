const express=require('express');
const admin=express();



const session=require('express-session')
const config=require('../config/config')
admin.use(session({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:true
}))


const bodyParser=require('body-parser')
admin.use(bodyParser.json());
admin.use(bodyParser.urlencoded({extended:true}));

//------------------admin routes----------------    
const auth=require('../middleware/adminAuth')
const adminController=require('../controller/adminController')
admin.get('/',auth.isLogout ,adminController.loadLogin) 
admin.post('/',adminController.verifyLogin);
admin.get('/dashboard',auth.isLogin,adminController.loadHome);
admin.get('/logout',auth.isLogin,adminController.logout)
admin.get('/new-user',auth.isLogin,adminController.loadNewUser)
admin.post('/new-user',auth.isLogin,adminController.addNewUser)
admin.get('/edit-user',auth.isLogin,adminController.editUserLoad)
admin.post('/edit-user',auth.isLogin,adminController.updateUser)
admin.get('/delete-user',adminController.deleteUser)


admin.get('*',(req,res)=>{
    res.redirect('/admin')
});

module.exports=admin;