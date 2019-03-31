const express = require('express');
const studentCtrl = require('./controllers/student.controller');
const classCtrl = require('./controllers/class.controller');
const registerCtrl = require('./controllers/register.controller');
const router = express.Router();

// In-line function, not a good practice
router.get('/', function(req, res) {
  res.send('Hello World from UT.EDU.VN');
});

// Route API for student
router.get('/student', studentCtrl.list);

router.post('/student', studentCtrl.create);
router.get('/student/:id', studentCtrl.read);
router.put('/student/:id', studentCtrl.update);
router.delete('/student/:id', studentCtrl.delete);

// Route API for class
router.get('/class', classCtrl.list);

router.post('/class', classCtrl.create);
router.get('/class/:id', classCtrl.read);
router.put('/class/:id', classCtrl.update);
router.delete('/class/:id', classCtrl.delete);

// Transaction route
router.post('/register', registerCtrl.create);

module.exports = router;
