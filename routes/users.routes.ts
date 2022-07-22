import { Router, Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import bcrypt from "bcrypt";

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

userRoutes.post('/login',  (req: Request, res : Response) => {
    const {body: {email, password}} = req;

    User.findOne({email}, (err, userDB: IUser) => {
        if(err) throw err;

        if(!userDB){
            res.json({
                ok: false,
                msg: "Wrong email or Password"
            });
        }

        if(userDB.comparePassword(password)){
            res.json({
                ok: true,
                msg: "Logged",
                token: "asfas6fas6f5a6s5f"
            });
        }else{
            res.json({
                ok: true,
                msg: "invalid password"
            });
        }


    })


});

export default userRoutes;