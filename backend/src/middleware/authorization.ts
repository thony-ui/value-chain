import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

require("dotenv").config();

const secretKey = process.env.SECRET_KEY!;

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({
        error: "Authorization header is required.",
      });
      return;
    }

    const jwtToken = authorization.replace("Bearer ", "");

    const payload = jwt.verify(jwtToken, secretKey) as jwt.JwtPayload;
    if (!payload.sub) {
      res.status(401).json({
        error: "Sorry, but you are not authorized to view this page.",
      });
      return;
    }

    req.user = { id: payload.sub };

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({
      error: "Invalid or expired token",
    });
    return;
  }
};
