import { Response, NextFunction } from "express";
import Token from "../classes/token";

export const checkTokenMdw = (req: any, res: Response, next: NextFunction) => {
    const userToken = req.get('x-token') || '';

    Token.checkToken(userToken).
        then((decoded: any) => {
            req.user = decoded.user;
            next();
        }
    )
    .catch((_) => {
        res.json({
            ok: false,
            msg: "Invalid token"
        })
    });

}