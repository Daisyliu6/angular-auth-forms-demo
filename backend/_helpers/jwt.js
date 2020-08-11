// the node JWT middleware checks the JWT token received
// in the http request from the client is valid before allowing access to the API
// JWT authenticaation is used on all routes except for the authenticate route

const expressJwt = require("express-jwt");
const config = require("config.json");
const userService = require("../users/user.service");

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/users/authenticate",
      "/users/register",
    ],
  });
}

// async function always returns a promise
async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }
  done();
}
