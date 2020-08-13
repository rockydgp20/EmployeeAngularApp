const  mongoose = require('mongoose');
// var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const  Employee = new mongoose.Schema({
    name: {
        type: String,
    },
    position: {
        type: String
    },
    office: {
        type: String
    },
    salary: {
        type: Number
    }
    // username: {
    //     type: String,
    //     lowercase: true,
    //     required: true,
    //     unique: true
    // },
    // password: {
    //     type: String,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     lowercase: true,
    //     unique: true
    // }
});
// UserSchema.pre('save', function(next) {
//     // do stuff
//     var user = this;
//     console.log(user);
//     bcrypt.hash(user.password, saltRounds, (err,hash) => {
//         if(err) return next(err);
//         user.password = hash;
//     });
//   });


module.exports = mongoose.model('Employee',Employee );