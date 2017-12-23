var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    message:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, 
{
    timestamps: true
});

var departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    file: {
        type: String
    },
    featured: {
        type: Boolean,
        default:false
    },
    
    message:[messageSchema]
}, 
    {
    timestamps: true
    }
);

var Departments = mongoose.model('Department', departmentSchema);

module.exports = Departments;