const StudentModel = require('./../models/student.model');

exports.list = function(req, res) {};

exports.create = function(req, res) {
  let newStudent = new StudentModel({
    studentId: req.body.studentId,
    studentName: req.body.studentName,
    startYear: req.body.startYear,
    currentYear: req.body.currentYear
  });
  newStudent.save(function(err) {
    if (err) {
      return res.status(500).send('Created Student Fail.');
    }
    return res.send(newStudent._id);
  });
};

exports.read = function(req, res) {
  StudentModel.findById(req.params.id, function(err, student) {
    if (err) {
      return res.status(500).send('Read Student Fail.');
    }
    return res.send(student);
  });
};

exports.update = function(req, res) {};
exports.delete = function(req, res) {};
