const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentSchema = new Schema({
  studentId: {
    type: String,
    required: true,
    maxlength: [11, 'MSSV không quá 11 ký tự']
  },
  studentName: {
    type: String,
    required: true,
    maxlength: 70
  },
  startYear: {
    type: Date,
    default: Date.now()
  },
  currentYear: {
    type: Date,
    default: Date.now()
  },
  classes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Class'
      }
    ]
  }
});

// Export the model
module.exports = mongoose.model('Student', StudentSchema);
