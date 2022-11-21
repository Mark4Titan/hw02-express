const jwt = require("jsonwebtoken");
const { User } = require("../../models/users.model");

const { JWT_SECRET } = process.env;

async function check(req, res, next) {  
  const authHeader = req.headers.authorization || "";
  const [tokenType, token] = authHeader.split(" ");
 
  if (tokenType === "Bearer" && token) {
    try {
      const verifiedToken = jwt.verify(token, JWT_SECRET);      
      const user = await User.findById(verifiedToken._id);        
      if (!user) throw new Error("!user");
      if (!user.token) throw new Error("!Unauthorized");
      req.user = user;

      return next(); // =>
    } catch (error) {
      throw new Error(error.message);
    }
  }

  throw new Error("!Unauthorized");
}

module.exports = {
  check,
};
