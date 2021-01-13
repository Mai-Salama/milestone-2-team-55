const mongoose = require('mongoose');
const AccidentalLeaves = mongoose.Schema({
    id:{type:String,
    required:true},
    req_id:{type: Number},
    date:{type:Number},
    month:{type: Number},
    reason:{type: Number},
    status:{type:Number}
});

module.exports = mongoose.model('AccidentalLeaves', AccidentalLeaves);