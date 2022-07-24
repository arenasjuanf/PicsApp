import mongoose from "mongoose";

export class DB {

    private url: string = "mongodb://localhost:27017";
    private dbName: string = "picsApp";

    connect(callback: Function){

        mongoose.connect(
            `${this.url}/${this.dbName}`,
            { autoCreate: true, autoIndex: true } , 
            (err: mongoose.CallbackError) => {
                if(err) throw err;
                callback()
            }
        );
    }

}