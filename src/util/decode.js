import jwt from "jsonwebtoken";

export const decode = (token) => {
  return jwt.decode(token, { complete: true });
};
