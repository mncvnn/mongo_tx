const ClassModel = require('./../models/class.model');

exports.list = function(req, res) {
  ClassModel.find({}, function(err, returnClasses) {
    if (err) {
      return res.status(500).send('Load Classes Fail. Error: ' + err.message);
    }
    return res.send(returnClasses);
  });
};

exports.create = function(req, res) {
  let newClass = new ClassModel({
    classId: req.body.classId,
    className: req.body.className,
    room: req.body.room,
    location: req.body.location ? req.body.location : undefined
  });
  newClass.save(function(err) {
    if (err) {
      return res.status(500).send('Created new Class Fail. Error: ' + err.message);
    }
    return res.send(newClass._id);
  });
};

exports.read = function(req, res) {
  ClassModel.findById(req.params.id, function(err, returnClass) {
    if (err) {
      return res.status(500).send('Read a class Fail. Error: ' + err.message);
    }
    return res.send(returnClass);
  });
};

exports.update = function(req, res) {};
exports.delete = function(req, res) {};
