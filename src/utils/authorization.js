import jwt from "jsonwebtoken";
import Boom from "@hapi/boom";

export default async (req, res, next) => {
  try {
    if (
      req.path.includes("/public") ||
      req.path.includes("/login") ||
      req.path.includes("/signup") ||
      req.path.includes("/verify") ||
      req.path.includes("/web") ||
      req.path.includes("/transaction") ||
      req.path.includes("/contact") || 
      req.path.includes("/upload") || 
      req.path.includes("/images") ||
      req.path.includes("/challenge")
    ) {
      next();
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const userInfo = jwt.verify(token, "ECOMMERCE_TEST");
      if (userInfo.is_owner) {
        if (!req.path.includes("/web")) {
          next();
        } else {
          res
            .status(401)
            .json({
              success: false,
              message: "You are not authorized to perform this operation.",
            });
        }
      }
      // if (!userInfo.is_owner) {
      //     if (req.path.includes('/web')) {
      //         next();
      //     } else {
      //         res.status(401).json({ success: false, message: 'You are not authorized to perform this operation.' });
      //     }
      // }
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ success: false, message: "Token has expired." });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res
        .status(401)
        .json({
          success: false,
          message: "You are not authorized to perform this operation.",
        });
    }
    throw error;
  }
};
