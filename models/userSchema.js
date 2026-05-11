const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fullName:{
        type: string,
        required: true
    },
    email:{
        type: string,
        required:true,
        uniqe:true
    },
    password:{
        type: string,
        require:true,
        select: false
    },
    avatar:{
        type: string,
        default: ""
    },
    isvarified:{
        type: Boolean,
        default: false
    },
    otp:{
        type: string,
        default:null
    },
    otpExpiary:{
        type:Date,

    },
    role:{
        type: string,
        required:true,
        default: "user",
        enum: ["user","admin","modaretor"]
    },
    address:{
        type: string,

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
    res.status(500).send({message:"Invalied request"})
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