const mongoose = require('mongoose');
const { hashSync } = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        default: null,
        trim: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['Doctor', 'Patient']
    },
    createdByDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const saltRounds = 10;
        user.password = hashSync(user.password, saltRounds);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;