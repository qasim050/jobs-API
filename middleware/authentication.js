require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnauthenticatedError} = require("../errors");

const authMiddleware = async (req,res,next) => {
 const authHeaders = req.headers.authorization
 if(!authHeaders || !authHeaders.startsWith("Bearer ")){
    throw new UnauthenticatedError("plass provid valid token")
 }
 const token = authHeaders.split(" ")[1]
 try {
    const {userId,name} = jwt.verify(token,process.env.JWT_SECRET)
    req.user = {userId,name}
    next()
 } catch (error) {
    throw new UnauthenticatedError("authentication invalid")
 }
}
module.exports = authMiddleware