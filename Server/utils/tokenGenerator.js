const JWT = require("jsonwebtoken");

const createToken = (res, id) => {
  const token = JWT.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24, // (one day)
  };

  res.cookie("token", token, cookieOptions);

  return token;
};

module.exports = createToken;