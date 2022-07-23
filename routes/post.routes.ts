import { Router, Response } from "express";
import { IFileUpload } from "../interfaces/file-upload";
import { checkTokenMdw } from "../middlewares/auth";
import { Post } from  "../models/post.model";

const postRoutes = Router();

postRoutes.post("/create", [checkTokenMdw], (req: any, res: Response) => {
    const {body} = req;
    body.user = req.user._id;
    console.log(body)
    Post.create(body).then( async (postDb) => {

        await postDb.populate("user", "-password");
        res.json({
            ok: true,
            post: postDb
        });

    }).catch( err => {
        res.json(err);
    })
});

postRoutes.get("/list", [checkTokenMdw], async (req: any, res: Response) => {
    const { page } = req.query || { page: 1 };
    const skip = 10 * (+page - 1);

    const posts = await Post.find()
        .sort({_id: -1})
        .skip(skip)
        .limit(10)
        .populate("user", "-password")
        .exec();

    res.json({
        ok: true,
        page,
        posts,
    })
})

// upload files
postRoutes.post("/upload", [checkTokenMdw], (req: any, res: Response) => {
    if(req.files){

        const {image} = req.files;
        
        if(!image?.mimetype.includes('image')){
            res.json({
                ok: false,
                file: "Invalid filetype"
            })
        }else{
            res.json({
                ok: true,
                file: image?.mimetype
            })
        }
    }else{
        res.json({
            ok: false,
            msg: "Not images sended"
        })
    }
})

export default postRoutes;