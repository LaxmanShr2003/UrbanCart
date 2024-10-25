import { AccessToken } from "../types/global";
import * as jwt from "jsonwebtoken";
export default class JWT {
  static sign({ payload, secretKey, exp }: AccessToken) {
    const expire = exp ? { expireIn: exp } : undefined;
    const token = jwt.sign(payload, secretKey,{ expiresIn: "30d" });
    return token;
  }

  static verify = <T>({ payload, secretKey }): T => {
    const verified = jwt.verify(payload, secretKey);
    return verified as T;
  };
}

