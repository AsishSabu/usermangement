const User = require("../models/userModels");

//  load the register--------------------
const loadRegister = async (req, res) => {
  try {
    res.render("users/register");
  } catch (error) {
    console.log(error);
  }
};

//------password encrypt----------------

const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const verify=async (req, res, next) => {
try {
 const email=req.body.email;
 const mail='adharsh@gmail.com';

 if(email===mail){
  res.redirect('/');
 }
  
  
} catch (error) {
  
}

}

//------insert to database----------------

const insertUser = async (req, res) => {
  try {
    const emailCheck = req.body.email;
    const checkData = await User.findOne({ email: emailCheck });
    if (checkData) {
      res.render("users/register", {
        message: "user already exists, Please try with new email",
      });
    } else {
     
      const spassword = await securePassword(req.body.password);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mno,
        password: spassword,
        is_admin: 0,
      });

      const userData = await user.save();

      if (userData) {
        res.render("users/register", {
          message: "your registration is succesfully completed",
        });
      } else {
        res.render("users/register", {
          message: "your registration is failed",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//------------------verifylogin----------------

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email: email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        if (userData.is_admin === 0) {
          req.session.user_id = userData._id;
          

          res.redirect("/home");
        } else {
          res.render("users/login", {
            message: "check Email and Password you entered",
          });
        }
      } else {
        res.render("users/login", {
          message: "check Email and Password you entered",
        });
      }
    } else {
      res.render("users/login", {
        message: "check Email and Password you entered",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};



//---------------load login--------------------------------

const loginLoad = async (req, res) => {
  try {
    res.render("users/login");
  } catch (error) {
    console.log(error.message);
  }
};

//-------------------load home--------------------------------

const loadHome = async (req, res) => {
  try {
    const userData=await User.findById({_id:req.session.user_id})    
    res.render("users/home", { message:userData.name });
  } catch (error) {
    console.log(error.message);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadRegister,
  insertUser,
  loginLoad,
  loadHome,
  verifyLogin,
  userLogout,
};
