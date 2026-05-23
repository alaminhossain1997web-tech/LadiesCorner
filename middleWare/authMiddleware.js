const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    try {
        const {Acc_Tkn} = req.cookies;
        const decoded = jwt.verify(Acc_Tkn,process.env.JWT_SEC);
        if(decoded) {
            req.user = decoded;
            next()
        } else{
            res.status(400).send({messege:"Unauthorised request!"})
        }
        
    } catch (error) {
        res.status(500).send({messege:"Internel Server Error!"})
    }
}
module.exports = {authMiddleware};