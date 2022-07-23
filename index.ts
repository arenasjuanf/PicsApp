
import Server from "./classes/server";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/users.routes";
import postRoutes from "./routes/post.routes";
import bodyParser from "body-parser";
const server = new Server();

//server.app.use( bodyParser.json())
//server.app.use( bodyParser.urlencoded({ extended: true }))

// File Upload
server.app.use( fileUpload() )

// App routes
server.app.use('/user', userRoutes);
server.app.use('/post', postRoutes);

// DB Connect
mongoose.connect(
    "mongodb://localhost:27017/picsApp",
    { autoCreate: true, autoIndex: true } , 
    (err: mongoose.CallbackError) => {
        if(err) throw err;
        console.log("DB Online");   
    }
);

server.start(() => console.log(`...running on port: ${server.port} ....`));