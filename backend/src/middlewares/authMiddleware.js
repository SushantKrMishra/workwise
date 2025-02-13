const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "QWWEGHKJFDSDAFRTYE$W%V#CWERwdrsxknoefoyablsdfnhsdfcueocqbrw");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authenticate;
