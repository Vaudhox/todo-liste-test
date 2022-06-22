import * as express from "express";
import * as jwt from "jsonwebtoken";
import { configService } from "../../config/config.service";
import  DB from "../../common/database";
import { ServerError } from "../../config/server-errors";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
    const token = request.headers["Authorization"]  as string || request.headers["authorization"] as string;

    return new Promise((resolve, reject) => {
      if (token && token.split(' ').length == 2 && token.includes('Bearer')) {
        jwt.verify(token.split(' ')[1], configService.getValue("JWT_ACCESS_TOKEN_SECRET_KEY"), async function (err: any, decoded: any) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const user = await DB.getUserRepository().findOneBy({id: decoded.id})
          // Check if JWT contains all required scopes
          /*for (let scope of scopes) {
            if (scope === "tasks:owner") {
              reject(new ServerError('Unauthorize', 401));
            }
          } */
          resolve(user);
        }
      });
      } else {
        reject(new ServerError('No token provided', 401));
      }
    });

}
