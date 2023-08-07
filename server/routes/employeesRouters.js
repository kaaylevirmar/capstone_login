const express = require("express");
const router = express.Router();
const ExpressError = require('../../utils/ExpressError');
const { employeeSchemaValidation } = require("../../schemas");
const { viewAllEmployees, employeesForm, addEmployee, viewEmployee, updateEmployeeForm, updateEmployee, deleteEmployee} = require("../controller/employeeController")

const employeeValidate = (req, res, next) => {
    const {error} = employeeSchemaValidation.validate(req.body)
    if(error){
       const msg = error.details.map(el=> el.message).join(',');
       throw new ExpressError(msg,400);
    }else{
      next();
    }
}




router.get('/employees', viewAllEmployees);
router.get('/employees/form', employeesForm);
router.post('/employees', employeeValidate, addEmployee);
router.get('/employees/:id', viewEmployee);
router.get('/employees/:id/update-employee-form', updateEmployeeForm);
router.delete('/employees/:id', deleteEmployee);

module.exports = router