const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const verifyToken = promisify(jwt.verify);

const generateToken = function (user, scope = "user") {
  const payload = { ...user, scope };
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 86400 });
};

const verifyScope = (expectedScope) => async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json({ success: false, message: "Unauthorized: No token provided" });
  }

  if (!bearerHeader.startsWith("Bearer ")) {
    return res.status(403).json({ success: false, message: "Unauthorized: Incorrect token format" });
  }

  const token = bearerHeader.split(" ")[1];
  const decoded = await verifyToken(token, process.env.TOKEN_SECRET);

  if (decoded.scope === expectedScope) {
    req.user = decoded;
    next();
  } else {
    return res.status(403).json({ success: false, message: `Unauthorized: ${expectedScope} role required` });
  }
};

// Middleware for different roles
const isUser = verifyScope("user");
const isAdmin = verifyScope("admin");
const isMentor = verifyScope("mentor");
const isMentee = verifyScope("mentee");

module.exports = { generateToken, isUser, isAdmin, isMentor, isMentee };
