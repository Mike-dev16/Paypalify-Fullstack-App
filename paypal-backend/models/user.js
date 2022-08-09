const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        minLength: 2,
        required: true
    },
    lastName: {
        type: String,
        minLength: 2,
        required: true
    },
    passwordHash:{
        type: String,
        minLength: 8,
        required: true
    } ,
    verified: {
        type: Boolean,
        default: false
    },
    activities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
        }
    ],
});


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;