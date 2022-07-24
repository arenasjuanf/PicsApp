import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import initRouter from "../routes";
import { DB } from "./db";
export default class Server {

    public app: express.Application;
    public port: number = 3000;
    
    constructor(){
        this.app = express()
        .use(cors())
        .use(express.json())
        .use( fileUpload({useTempFiles: true}) )
    }

    start(callback: () => void){    
        
        // DB Connect
        const database: DB = new DB();
        database.connect(() => console.log("DB On"));


        // init routing
        initRouter(this.app);

        this.app.listen( this.port, callback );
    }
    
}