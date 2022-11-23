import "dotenv/config";
export default {
  secret: "0" + process.env.TOKEN_SECRET,
  expiresIn: process.env.TOKEN_EXPIRE,
};
