import * as express from "express";
import * as jwt from "jsonwebtoken";
import { configService } from "../../config/config.service";
import  DB from "../../common/database";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
    const token = request.headers["Authorization"]  as string || request.headers["authorization"] as string;

    return new Promise((resolve, reject) => {
      if (!token && token.split(' ').length > 1 && token.includes('Beare')) {
        reject(new Error("No token provided"));
      }
      jwt.verify(token.split(' ')[1], configService.getValue("JWT_ACCESS_TOKEN_SECRET_KEY"), async function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          // Check if JWT contains all required scopes
          for (let scope of scopes) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error("JWT does not contain required scope."));
            }
          }

          const user = await DB.getUserRepository().findOneBy({id: decoded.id})
          resolve(user);
        }
      });
    });

}
