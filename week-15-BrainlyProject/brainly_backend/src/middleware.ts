import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const jwt_key = "jwdq00-1-==1";

export function authuser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["token"];
  const decode = jwt.verify(token as string, jwt_key);
  if (decode) {
    // @ts-ignore
    req.userid = decode.userId;
    next();
  } else {
    res.json({ msg: "You are not signed in !" });
  }
}
