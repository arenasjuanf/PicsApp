import FileSystem from "../classes/file-system";
import { IResponse } from "../interfaces/response";
import { Post, IPost } from "../models/post.model";
import { IUser } from "../models/user.model";

const fileSystem = new FileSystem();


export default class PostController {
    constructor(){}

    async create(data: Partial<IPost>): Promise<IResponse>{
        try{
            const postDb = await Post.create( data );
            await postDb.populate("user", "-password");

            return {
                response:{
                    ok: true,
                    msg: postDb
                },
                statusCode: 200
            };
        }catch(err){
            return {
                response:{
                    ok: false,
                    msg: err
                },
                statusCode:500
            }
        }
    }

    async list(page: number): Promise<IResponse>{

        const skip = 10 * (+page - 1);

        try {

            const posts = await Post.find()
                .sort({_id: -1})
                .skip(skip)
                .limit(10)
                .populate("user", "-password")
                .exec();

            return {
                response: {
                    ok: true,
                    msg: posts
                },
                statusCode: 200
            }


        }catch(err){
            return {
                response: {
                    ok: false,
                    msg: err
                },
                statusCode: 500
            }
        }

    }

    async upload(files: any, user: Partial<IUser>): Promise<IResponse>{
        if(files){

            const {image} = files;
            
            if(!image?.mimetype.includes('image')){
                return {
                    response: {
                        ok: false,
                        msg: "Invalid filetype"
                    }, 
                    statusCode: 500
                }
            }else{
                await fileSystem.saveTmpImage(image, user._id);
                
                return {
                    response: {
                        ok: true,
                        msg: image?.mimetype
                    },
                    statusCode: 501
                }
            }
        }else{
            return {
                response: {
                    ok: false,
                    msg: "Not images sended"
                },
                statusCode: 500
            }
        }
    }

    getImage(userId: string, imgName: string): string{
        const imgPath: string = fileSystem.getImgPath(userId, imgName);
        return imgPath;
    }

}