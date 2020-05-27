const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({    
    description: {
        type: String,
        required: true
    },   
    assigned: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'in progress'
    }
    
      
});


module.exports = mongoose.model('Tasks', TaskSchema);