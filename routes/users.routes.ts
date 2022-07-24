import { Router, Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import Token from "../classes/token";
import { checkTokenMdw } from "../middlewares/auth";
import UserController from "../controllers/user.controller";

const userRoutes = Router();
const controller = new UserController();

//Create user
userRoutes.post('/create', async (req: Request, res : Response) => {
    const {body: {name, email, password, avatar}} = req;

    const user = {
        name,
        email, 
        password: bcrypt.hashSync(password, 10) ,
        avatar: avatar || 'av-0.png'
    };
    
    const {response, statusCode} = await controller.create(user);
    
    res.status(statusCode).json(response);
});

//Login
userRoutes.post('/login',  async (req: Request, res : Response) => {
    const {body: {email, password}} = req;
    const {response, statusCode} = await controller.login(email, password);
    res.status(statusCode).json(response);
});

//update
userRoutes.put('/update', [checkTokenMdw], async(req: any, res : Response) => {
    const {_id} = req.user;
    const {response, statusCode} = await controller.update(_id, req.body);
    res.status(statusCode).json(response);
});


userRoutes.get('/', [checkTokenMdw],(req: any, res: Response) => {
    const {response, statusCode} = controller.getInfo(req.user);
    res.status(statusCode).json(response);
})


export default userRoutes;