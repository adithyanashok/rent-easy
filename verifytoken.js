import jwt from "jsonwebtoken"


export const verifyToken=  (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) return res.status("You are not authenticated")

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if(error) return res.status(403).json("Token not valid")
        req.user = user
        next()
    })
}
