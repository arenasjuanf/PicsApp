import { IFileUpload } from "../interfaces/file-upload";
import path from "path";
import fs from "fs";
import uniqid from "uniqid";

export default class FileSystem {

    constructor(){};

    saveTmpImage(file: IFileUpload, userId: string ): Promise<any>{
        return new Promise((resolve, reject) => {
            const path = this.createUserFolder(userId);
            const fileName: string = this.getFileName(file.name);
            file.mv( `${path}/${fileName}`,(err: any) => {
                err ? reject(err) : resolve(1);
            });
        });
    } 

    private createUserFolder( userId: string ): string{
        const pathUser = path.resolve( __dirname, "../uploads", userId );
        const pathUserTemp = pathUser + "/temp";
        if(!fs.existsSync(pathUser)){
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;
    }

    private getFileName( originalName: string ){
        const extension = originalName.split('.').at(-1);
        return `${uniqid()}.${extension}`;
    }

    moveTempToPost(userId: string){
        const pathTemp = path.resolve( __dirname, "../uploads", userId, 'temp' );
        const pathPost = path.resolve( __dirname, "../uploads", userId, 'posts' );

        if(!fs.existsSync( pathTemp )){
            return [];
        }

        if(!fs.existsSync( pathPost )){
            fs.mkdirSync(pathPost);

        }
        const tmpImages: string[] = this.getTmpImages(userId, pathTemp);
        tmpImages.forEach( (image: string) => {
            fs.renameSync(`${pathTemp}/${image}`, `${pathPost}/${image}` );
        });

        return tmpImages;
    }

    private getTmpImages( userId: string, pathTemp :string ): string[] {
        return fs.readdirSync( pathTemp ) || [];
    }

    getImgPath(userId: string, img: string): string{
        const pathImg = path.resolve( __dirname, "../uploads", userId, 'posts', img );
        return fs.existsSync( pathImg ) ? pathImg : path.resolve( __dirname, "../uploads/default.jpg");
    }
}