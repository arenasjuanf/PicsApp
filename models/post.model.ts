import { Schema, Document, model } from "mongoose";

const postSchema = new Schema({
    created: {
        type: Date
    },
    description: {
        type: String,
    },
    imgs: [{
        type: String
    }],
    coords:{
        type: String
    }, 
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Must be an user reference"]
    }
},
    { versionKey: false }
);

postSchema.pre<IPost>('save', function( next) {
    this.created = new Date();
    next();
});


export interface IPost extends Document {
    created: Date,
    description: string,
    imgs: string[],
    coords: string,
    user: string
}

export const Post = model<IPost>('Post', postSchema);