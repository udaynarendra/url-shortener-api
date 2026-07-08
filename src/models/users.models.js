import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        required:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'invalid email format']
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
})

userSchema.pre('save',async function (next) {
    if(!(this.isModified("password"))){
        return next();
    }
   this.password = await bcrypt.hash(this.password,10);
    next()  
})

const User = mongoose.model('User',userSchema);
export default User;