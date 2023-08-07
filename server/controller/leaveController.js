const mongoose = require('mongoose');
const catchAsync = require('../../utils/catchAsync');
const Employee = require('../../models/employee');
const activePage = '/leave-management'

exports.viewLeaveManagement = async (req, res) => {
    res.render('pages/leaveManagement', {activePage});
}

exports.leaveForm = async (req, res) => {
    res.render('pages/newLeaveForm', {activePage});
}

exports.fetchDataForm = async (req, res) => {

  const {id} = req.params;
  const employeeData = await Employee.findOne({employeeId: id})

  res.json({firstName: employeeData.firstName, lastName: employeeData.lastName });
  
}