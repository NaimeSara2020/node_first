import User from "../models/userModel.js";
import bcrypt from "bcrypt"; //password hashleme
import jwt from "jsonwebtoken"; //token oluşturma

const createUser = async (req,res) =>{
    try {
        const user = await User.create(req.body);
        
        res.status(201).json({
            succeded: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            succeded: true,
            error
        })
    }
}

const userLogin = async (req,res) => {
    try {
        const { username,password } = req.body;
        const user =  await User.findOne({username});
        
        let same = false;

        if(user){
            same = await bcrypt.compare(password, user.password) // hashlenen şifreyi kontrol eder.
        }else{
            return res.status(401).json({  //kullanıcının olmadığı durumlarda return ifadesi kullanıldı
                succeded: false,
                error : "There is no such user"
            })
        }

        if(same){
            const token = createToken(user._id);
            res.cookie("jwt",token, {
                httpOnly: true,  //frontent sayfalarında istek atmak ve http sayfalarında kullanım sağlar
                maxAge: 1000*60*60*24  // 1 güne eşit
            })
            // res.status(200).send("You are logged")
            // res.status(200).json({ user })

            res.redirect('/users/dashboard')
        }else{
            res.status(401).json({
                succeded: false,
                error : "Password are not matched"
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const createToken = (userId) =>{
    return jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn:"1d" //tokenin sonlanma durumu
    })
}
const getDashboardPage = (req,res) =>{
    res.render("dashboard",{
        link: "dashboard"
    })
}

export { createUser,userLogin,getDashboardPage };