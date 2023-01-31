// Student Schema
import { Schema, model } from "mongoose";
import { genSalt, hash as _hash } from 'bcrypt';

const validateEmail = (email) => {
    // check for characters in front and behind the @ symbol 
    return (/^\S+@\S+\.\S+$/).test(email)
}

const userSchema = new Schema({
    email: {
        type: String,
        required: 'Email address is required',
        validate: [validateEmail, 'Email Invalid'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,

    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now  // show the time each name and class was created
    },
});

userSchema.pre('save', (next) {
    const user = this;
    // if user is new then run or if we are modifying pass then run 
    if (userSchema.isNew || userSchema.isModified('password')) {
        // run hashing and salting
        genSalt(10, (error, salt) => {
            // salt each time 
            // if error the return error, if no error then run bcrypt hash on the password for each salt
            if (error) { return next(error) }
            _hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            })
        })
    }
    else {
        next();
    }
})

export default model("User", userSchema);