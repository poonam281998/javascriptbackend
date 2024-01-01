import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //Cloudnary url
        required: true
    },
    coverImage: {
        type: String //Cloudnary url
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshedToken: {
        type: String
    }
},
{
    timestamps: true
})

userSchema.pre("save", async function(req,res,next) {
    if(!this.ismodified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.isPasswordcorrect = async function(password) {
   return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SCRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SCRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )

}

export const User = mongoose.model('User',userSchema);