const jwt=require('jsonwebtoken');
const verify=(req, res, next)=>{
    let authToken=req.headers['authorization'];
    let splitToken=authToken.split(" ")[1];
    if(!splitToken){
        res.json({ Message: "User does not exists" }).status(500);
    }
    else{
        jwt.verify(splitToken, process.env.SECRET_KEY, (err, decode)=>{
            if(err){
            res.json({"Message":"User is incorrect", error:err})
            } 
            else{
                req.email=decode.email
                next();
            }
        })
    }
}
module.exports={verify};