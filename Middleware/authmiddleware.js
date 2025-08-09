const { validateToken } = require('../Services/authentication');

function requireAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    console.log("No token found");
    return res.redirect('/user/signin');
  }

  try {
    const user = validateToken(token);
    console.log("Decoded user from token:", user); // Should have `id`
    req.user = user;
    next();
  } catch (err) {
    console.error("Token validation error:", err);
    return res.status(401).send("Unauthorized. Invalid Token.");
  }
}

function requireAdmin(req, res, next) {
    if (req.user && req.user.role === 'ADMIN') {
        return next();
    }
    return res.status(403).send("Forbidden: Admins only.");
}

// middleware/auth.js
function isLoggedIn(req, res, next) {
  if (!req.user) {
    return res.redirect("/signin"); // Or return res.status(401).send("Unauthorized");
  }
  next();
}

// module.exports = { isLoggedIn };


module.exports = { requireAuth, requireAdmin, isLoggedIn};
