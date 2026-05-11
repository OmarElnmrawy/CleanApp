import User from "../models/user.js";
import jwt from "jsonwebtoken"; // a library that saves web tokens

export const protect = async(req, res, next) => {

let token;

if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) // checking for token
{

   try{
     token = req.headers.authorization.split(" ")[1]; //extracting the token from the word "bearer"
    const decoded = jwt.verify(token, process.env.JWT_SECRET) //jwt.verify: This uses your secret key from the .env file to "unscramble" the token. Inside that token is the User's ID.
    req.user = await User.findById(decoded.id).select("-password");
    return next();
   }
   catch{
    console.error("TOKEN VERIFICATION: FAILED" , err.message)
    return res.status("401").json({message :"NOT AUTHORIZED TOKEN FAILED"})
   }

}
return res.status("401").json({message :"NOT AUTHORIZED TOKEN FAILED"})
}
//Get Token => 2. Verify Token => 3. Find User => 4. Let them through.