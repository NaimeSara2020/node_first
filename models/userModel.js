import mongoose from "mongoose";
import bcrypt from "bcrypt"; // hashleme kütüphanesi

const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required : true
    }
},
{
    timestamps: true  //created_at ve updated_at iki adet alan oluşur
});

userSchema.pre("save",function(next){ // kayıt işleminden önce yapılacak işlemler fonksiyonu
    //next parametresi işlem tamamlandıktan sonra yapılacak işlem
     const user = this;
     bcrypt.hash(user.password,10,(err,hash)=>{
        user.password = hash;
        next();
     })
})


const User = mongoose.model("User",userSchema);
export default User;