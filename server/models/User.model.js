const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseHidden = require('mongoose-hidden')();

let UserSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        } 
    },
    password: { 
        type: String, 
        required: true, 
        hide: true,
        minLength: 6 
    },
    lists   : [{ 
        type: Schema.Types.ObjectId, 
        ref: 'List',
        default: [] 
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: { createdAt: true, updatedAt: true }
});

//Protect Paswword
UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//Generate Token
UserSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//Login
UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(mongooseHidden)

const User = mongoose.model('User', UserSchema)
module.exports = User;