const mongoose =require('mongoose');
const catchAsync = require('../../utils/catchAsync');
// Seeds
const offices = require('../../seeds/offices');
const positions = require('../../seeds/position');
const designations = require('../../seeds/designation');
// Models
const Employee = require('../../models/employee');
const Transaction = require('../../models/transaction')

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/hrms')
.then(()=>{
    console.log('Connection Open.');
})
.catch((err)=>{
    console.log(`Error: ${err}`);
})
const activePage = '/employees'
// View All Employees
exports.viewAllEmployees = async (req, res) => {
    const employees = await Employee.find({})
    res.render('pages/employees',{employees, activePage});
}

// View New Employee Form
exports.employeesForm = (req, res)=>{
    res.render('pages/employeeForm',{ offices, positions, designations, activePage});
}

// Add New Employee
exports.addEmployee = catchAsync(async (req, res)=>{
    const employee = req.body.employee;
    const newEmployee = new Employee(employee);
    await newEmployee.save();
     const addTransaction = {
         transaction: `${newEmployee.firstName} is added to the database`
     }
    const transaction =  new Transaction(addTransaction);
    await transaction.save();
    res.redirect('/employees');
})

// View Specific Employee
exports.viewEmployee = catchAsync(async (req, res)=>{
    const id = req.params.id;
    const employee = await Employee.findById(id);
    res.render('pages/emp-info',{employee, activePage})
})

// View Update Employee Form
exports.updateEmployeeForm = catchAsync(async (req, res)=>{
    const id = req.params.id;
    const employee = await Employee.findById(id);
    res.render('pages/edit',{employee, offices, positions, designations, activePage});
})

// Update Employee Form
exports.updateEmployee = catchAsync(async(req, res) => {
    const id = req.params.id;
    const employee = await Employee.findByIdAndUpdate(id,{...req.body.employee});
    res.redirect('/employees')
})

exports.deleteEmployee = catchAsync(async (req, res) => {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    await Employee.findByIdAndDelete(id);
    const addTransaction = {
        transaction: `${employee.firstName} has been deleted`
    }

    const transaction =  new Transaction(addTransaction);
    await transaction.save();
    res.redirect('/employees')
})
