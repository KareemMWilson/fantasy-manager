import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";


type UserPayload =  {userId: string, email: string}
declare global {
  namespace Express {
    interface Request {
      user: UserPayload
    }
  }
}



export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
