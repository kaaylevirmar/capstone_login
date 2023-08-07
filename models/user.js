const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UsersSchema = new Schema({

 
    email: {
        type: String,
        required: true,
        unique: true
    },

    // firstName: {
    //     type: String,
    //     required: true,
       
    // },

    // lastName: {
    //     type: String,
    //     required: true,
        
    // }
  
   
})

UsersSchema.plugin(passportLocalMongoose)

// UsersSchema.statics.findAndValidate = async function (username,password){
//     const foundUser = await this.findOne({username})
//     const isValid = await bcrypt.compare(password, foundUser.password);
//     return isValid ? foundUser : false;
// }

module.exports = mongoose.model('User', UsersSchema);