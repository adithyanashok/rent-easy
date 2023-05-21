import jwt from "jsonwebtoken"


export const verifyToken = (req, res, next) => {
    // Take the token
    const token = req.cookies.access_token
    // Throw a error if there is no token
    if(!token) return res.status(401).json("You are not LoggedIn")
    // Verify the token 
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        // If get an error throw a error
        if(err) return res.status(403).json("Token not valid")
        req.user = user
        next()
    })
}

export const verifyHost = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.host) {
        next();
      } else {
        res.status(401).json("You are not host")
      }
    });
  };
