import express from "express";
import postRoutes from "./post.routes";
import userRoutes from "./users.routes";


export default function initRouter(app: express.Application){
   app.use('/post', postRoutes );
   app.use('/user', userRoutes);
}