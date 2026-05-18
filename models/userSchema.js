const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        select: false
    },
    avatar:{
        type: String,
        default: ""
    },
    isvarified:{
        type: Boolean,
        default: false
    },
    otp:{
        type: String,
        default:null
    },
    otpExpiary:{
        type:Date,

    },
    role:{
        type: String,
        required:true,
        default: "user",
        enum: ["user","admin","modaretor"]
    },
    address:{
        type: String,

    }
},
{timestamps:true}
  );

  userSchema.pre('save', async function () {
  try {
    // Only hash if password is new or changed
    if (!this.isModified('password')) return;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);

  } catch (error) {
    throw error;
  }
});
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};


module.exports = mongoose.model("user",userSchema)
