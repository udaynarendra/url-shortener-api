import bcrypt from 'bcrypt';
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
},{timestamps:true})

userSchema.pre('save',async function () {
    if(!(this.isModified("password"))){
        return;
    }
   this.password = await bcrypt.hash(this.password,10);
})

const User = mongoose.model('User',userSchema);
export default User;