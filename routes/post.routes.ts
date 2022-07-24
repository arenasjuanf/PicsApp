import { Router, Response } from "express";
import FileSystem from "../classes/file-system";
import PostController from "../controllers/post.controller";
import { checkTokenMdw } from "../middlewares/auth";
import { Post } from  "../models/post.model";

const postRoutes = Router();
const fileSystem = new FileSystem();

const controller = new PostController();


postRoutes.post("/create", [checkTokenMdw], async (req: any, res: Response) => {
    const {body} = req;
    body.user = req.user._id;
    const imgs = fileSystem.moveTempToPost(body.user);
    body.imgs = imgs;

    const {response, statusCode} = await controller.create(body);
    res.status(statusCode).json(response);
});

postRoutes.get("/list", [checkTokenMdw], async (req: any, res: Response) => {
    const { page } = req.query || { page: 1 };
    const {response, statusCode} = await controller.list(page);
    res.status(statusCode).json(response);
   
})

postRoutes.post("/upload", [checkTokenMdw], async (req: any, res: Response) => {
    const {response, statusCode} = await controller.upload(req.files, req.user);
    res.status(statusCode).json(response);

})

postRoutes.get('/image/:userId/:img', [checkTokenMdw], (req: any, res: Response) => {
    const {params: {userId, img}} = req; 
    const imgPath =  controller.getImage(userId, img);
    res.sendFile(imgPath);
});

export default postRoutes;