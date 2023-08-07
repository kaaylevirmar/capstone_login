const express = require('express');
const router = express.Router();
const  passport = require('passport');
const ExpressError = require('../../utils/ExpressError');
const { userSchemaValidation } = require("../../schemas");
const { userView, userForm, addUser, deleteUser, viewUser, editUser, editUserForm,userLoginform,userLogin ,userLogout } = require('../controller/userController');


const userValidate = (req, res, next) => {
    const {error} = userSchemaValidation.validate(req.body)
    if(error){
       const msg = error.details.map(el=> el.message).join(',');
       throw new ExpressError(msg,400);
    }else{
      next();
    }
}

// const requireLogin = (req, res, next) =>{
//   if(!req.session.user_id){
//       return res.redirect('/login');
//   }
//   next();

// }

router.get('/login',userLoginform)
router.post('/login',passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}),userLogin)
router.get('/users', userView)
router.get('/register', userForm)
router.post('/users', addUser)   
router.get('/users/:id',viewUser)   
router.get('/users/:id/edit', editUserForm)
router.patch('/users/:id', userValidate, editUser)
router.delete('/users/:id', deleteUser)   
router.post('/logout',userLogout)
 
module.exports = router