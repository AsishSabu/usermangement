const user = require("../models/userModels");
const bcrypt = require("bcrypt");
//------------------admin login-------------------
const loadLogin = async (req, res) => {
  try {

    res.render("admin/login");
  } catch (error) {
    console.log(error);
  }
};
//--------------------verification--------------------  
const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await user.findOne({ email:email});
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        if (userData.is_admin === 0) {
          res.render("admin/login", { message: "you are not admin" });
        } else {
          req.session.admin_id=userData._id;
    
         return  res.redirect("/admin/dashboard");
        }
      } else {
        res.render("admin/login", {
          message: "Email and password is incorect",
        });
      }
     } else {
      res.render("admin/login", { message: "Email and password is incorect" });
    }
  } catch (error) {

  }
};
//------------------secure password--------------------   

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

//------------------load home page---------------------------------
const loadHome= async (req, res) => {
  try {
    const adminData=await user.findById({_id:req.session.admin_id})
    var search='';
    if(req.query.search){
      search=req.query.search
    }
    const userData=await user.find({
      is_admin:0,
      $or:[{name:{$regex:'.*'+search+'.*',$options:'i'}},
      {email:{$regex:'.*'+search+'.*',$options:'i'}},
      {mobile:{$regex:'.*'+search+'.*',$options:'i'}},],
    }).sort({name:1})
    res.render("admin/dashboard",{admin:adminData, users:userData});
    
  } catch (error) {
    console.log(error.message);
  }
};


//---------------logout------------------------------

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/admin')
  } catch (error) {
    console.log(error.message);
  }
}
//---------------------load new user------------------------   

const loadNewUser= async (req, res)=>{
  try {
    res.render('admin/new-user')
  } catch (error) {
    console.log(error.message);
  }
}

//-----------------add new user-------------------------------------------- 


const addNewUser= async (req, res)=>{
  try {
      const name=req.body.name;
      const email=req.body.email;
      const mobile=req.body.mno; 
      const spassword= await securePassword(req.body.password)
 
      const User=new user({
        name:name,
        email:email,
        mobile:mobile,
        password:spassword,
        is_admin: 0
      });
const userData=await User.save();

if(userData){
  res.redirect('admin/dashboard')
}else{
  res.render('admin/new-user',{message:'something went wrong'})
}

    } catch (error) {
       console.log(error.message); 
  }
}


const editUserLoad= async(req, res)=>{
  try {
    const id=req.query.id;
    const userData= await user.findById({_id:id});
    console.log(userData);
    res.render('admin/edit-user',{user:userData})
  } catch (error) {
    console.log(error.message);
  }
}

//----------------------update user------------------------

const updateUser= async (req, res) => {
  try {
    const userData=await user.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mno}});
    res.redirect('admin/dashboard',)
  } catch (error) {
    console.log(error.message);
  }
}

//----------------------delete user------------------------ 
const deleteUser= async (req, res)=>{
  try {
     const id=req.query.id;
 
     await user.deleteOne({_id:id})
     res.redirect('admin/dashboard')
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  loadLogin,
  verifyLogin,
  loadHome,
  logout,
  loadNewUser,
  addNewUser,
  editUserLoad,
  updateUser,
  deleteUser,
};
