const ClassModel = require('./../models/class.model');
const StudentModel = require('./../models/student.model');
exports.create = function(req, res) {
  if (req.body && req.body.classId && req.body.studentId) {
    var updateObj;
    var student_id, class_id;
    var session, sessionOpts;
    ClassModel.startSession()
      .then(function(_session) {
        session = _session;
        sessionOpts = { session: session };
        session.startTransaction();
      })
      .then(function() {
        return StudentModel.find({ studentId: req.body.studentId }).exec();
      })
      .then(function(studentArr) {
        if (Array.isArray(studentArr) && studentArr.length > 0) {
          student_id = studentArr[0]._id;
          updateObj = { $push: { students: student_id } };
          return ClassModel.find({ classId: req.body.classId }).exec();
        } else {
          throw new Error('Student Not Existed.');
        }
      })
      .then(function(classArr) {
        if (Array.isArray(classArr) && classArr.length > 0) {
          class_id = classArr[0]._id;
          return ClassModel.findByIdAndUpdate(class_id, updateObj, sessionOpts).exec();
        } else {
          throw new Error('Class Not Existed.');
        }
      })
      .then(function(updatedClass) {
        updateObj = { $push: { classes: class_id } };
        return StudentModel.findByIdAndUpdate(student_id, updateObj, sessionOpts).exec();
      })
      .then(function(updatedStudent) {
        session.commitTransaction(); // Committed transaction
        return res.send('Transaction committed.');
      })
      .catch(function(error) {
        session.abortTransaction(); // Rollback the transaction
        return res.status(500).send('Transaction rollback. Error:' + error.message);
      });
  } else {
    return res.status(400).send('Not valid request data.');
  }
};
