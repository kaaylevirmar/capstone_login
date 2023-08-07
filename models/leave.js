const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveSchema = new Schema({ 
    employeeId: String ,
    firstName: String, 
    lastName: String,
    leaveStart: String,
    leaveEnd: String,

})

module.exports = mongoose.model('Leave', LeaveSchema);