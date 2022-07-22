
import Server from "./classes/server";
import userRoutes from "./routes/users.routes";
import mongoose from "mongoose";

const server = new Server();

// App routes
server.app.use('/user', userRoutes);

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