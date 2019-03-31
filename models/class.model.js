const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClassSchema = new Schema({
  classId: {
    type: String,
    required: true,
    maxlength: [12, 'MS lớp không quá 12 ký tự']
  },
  className: {
    type: String,
    required: true,
    maxlength: 70
  },
  room: {
    type: String,
    required: true,
    default: 'H007',
    minlength: 4,
    maxlength: 4
  },
  location: {
    type: String,
    default: 'CS3'
  },
  students: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student'
      }
    ]
  }
});

// Export the model
module.exports = mongoose.model('Class', ClassSchema);
