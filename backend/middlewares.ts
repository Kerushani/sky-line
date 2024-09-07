import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  headers: {
    [key: string]: string | undefined | string[];
    payload?: string;
  };
}

export const isAuthenticated = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  try {
    let token: string
    if (typeof authorization === "string"){
        token = authorization.split(" ")[1];
    } else { //assuming that it would be a string[] in the latter case, but come back and fix later
        token = authorization[0].split(" ")[1]
    }    
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    req.headers["payload"] = JSON.stringify(payload); //had to JSON stringify because payload is of type JwtPayload and req.headers accepts string | string[] - come back later
  } catch (error) {
    if (error instanceof Error) {
      //type assertion to see if error is correctly of type Error
      res.status(401);
      if (error.name === "TokenExpiredError") {
        return next(new Error(error.name));
      }
      return next(new Error("Unauthorized!"));
    } else {
      res.status(500);
      return next(new Error("An unknown error occurred"));
    }
  }

  return next();
};
