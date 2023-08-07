const mongoose =require('mongoose');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const catchAsync = require('../../utils/catchAsync');

mongoose.connect('mongodb://127.0.0.1:27017/hrms')
.then(()=>{
    console.log('Connection Open.');
})
.catch((err)=>{
    console.log(`Error: ${err}`);
})


let activePage = '/register'



exports.userLoginform = async(req,res) =>{
  activePage = '/login'
  res.render('user/login',{activePage});

}

exports.userLogin = async(req,res) =>{
  req.flash('success','welcome Back')
  res.redirect('/')
  
}


exports.userView = async (req,res)=>{
  activePage = '/users'
  const  users = await User.find({});
    res.status(200).render('user/show',{users, activePage})
}

exports.userForm = async (req,res)=>{
    res.render('user/addUserForm',{activePage});
  }


exports.addUser = async (req,res)=>{




  try{
    const {firstName, lastName, email,username,password} = req.body;

      const user = new User({
      email,username
    });

   
    const registeredUser = await User.register(user,password);
    // req.body.user.firstName = firstName;
    // req.body.user.firstName = lastName;
    
  
    req.flash('success','Added user');
    res.redirect('/users');
  }catch(e){
    req.flash('error',e.message);
    res.redirect('/register')
}
  
}

exports.viewUser = async(req,res)=>{
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).render('user/viewUser',{user});
}

exports.editUserForm = async (req,res)=>{
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).render('user/edit',{user});
}

exports.editUser = async (req,res)=>{
  const userId = req.params.id;
  const user = await User.findByIdAndUpdate(userId, {...req.body.user});
  res.redirect(`/users/${userId}`);
}

exports.userLogout = (req,res)=>{
  req.session.user_id = null;
  res.redirect('/login');
}

exports.deleteUser = async(req,res) =>{
  const {id} = req.params;
  await User.findByIdAndDelete(id);
  res.redirect('/users');
}


