import User from "../models/userModel.js";
import jwt from "jsonwebtoken"; //token oluşturma

const authenticateToken = async (req ,res, next) =>{
    try {
        // const authHeader = req.headers["authorization"];
        // const token = authHeader && authHeader.split(" ")[1]  //tokeni headerden almak
        // if(!token){
        //     return res.status(401).json({
        //         succeded : false,
        //         error : "No token available"
        //     });
        // }
        // req.user = await User.findById(
        //     jwt.verify(token,process.env.JWT_SECRET).userId
        // );
        // next();
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if(err){
                    console.log(err.message);
                    res.redirect("/login");
                }else{
                    next();
                }
            })
        }else{
            res.redirect('/login')
        }

    } catch (error) {
        console.log("errs",error)
        res.status(401).json({
          succeded : false,
          error : "Not authorized"
        })
    }

}

export { authenticateToken }