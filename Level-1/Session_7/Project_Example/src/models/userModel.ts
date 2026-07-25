import { model, Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type:String,
        enum:["customer","admin"],
        default:"customer"
    },
    interests: {
        type: [String],
        default: undefined
    },
    signupDate:{
        type: Date,
        default: Date.now
    }
},{strict:false})

export const User = model("User",userSchema)