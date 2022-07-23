import bodyParser from "body-parser";
import express from "express";

export default class Server {

    public app: express.Application;
    public port: number = 3000;

    constructor(){
        this.app = express()
        .use(express.json())
    }

    start(callback: () => void){
        this.app.listen( this.port, callback );
    }


}