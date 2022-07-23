import { Router, Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import Token from "../classes/token";
import { checkTokenMdw } from "../middlewares/auth";

const userRoutes = Router();

//Create user
userRoutes.post('/create', (req: Request, res : Response) => {

    const {body: {name, email, password, avatar}} = req;

    const user = {
        name,
        email, 
        password: bcrypt.hashSync(password, 10) ,
        avatar: avatar || 'av-0.png'
    };

    User.create( user ).then(() => {
        res.json({
            msg: "it works",
            ok: true,
            user
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    })

    
});

//Login
userRoutes.post('/login',  (req: Request, res : Response) => {
    const {body: {email, password}} = req;

    User.findOne({email}, (err: any, userDB: IUser) => {
        if(err) throw err;

        if(!userDB){
            res.json({
                ok: false,
                msg: "Wrong email or Password"
            });
        }

        if(userDB.comparePassword(password)){

            const {name, avatar, email, _id} = userDB;

            const userToken = Token.getJwtToken({
                name, 
                avatar,
                email,
                _id
            });

            res.json({
                ok: true,
                msg: "Logged",
                token: userToken
            });
        }else{
            res.json({
                ok: true,
                msg: "invalid password"
            });
        }
    })
});

//update
userRoutes.put('/update', [checkTokenMdw], (req: any, res : Response) => {
    const {_id} = req.user;
    User.findByIdAndUpdate(_id, {...req.body},(err: any, userDB: any) => {
        if(!err){
            const {_id, name, email, avatar } = userDB;
            res.json({
                ok: userDB ? true : false,
                msg: userDB ? "user has been updated" : "user not found",
                token: userDB ? Token.getJwtToken({_id, name, email, avatar }) : ''
            });
        }
        else{
            res.json({
                ok: false,
                error: err
            });
        }
    })   
});

export default userRoutes;