
import mongoose, { Schema, Document, model, Types } from 'mongoose';



export interface IBook extends Document {
    title: string;
    author: string;
    isbn: string;
    year: number;
    publisherName?: Types.ObjectId; 
}

const bookSchema = new Schema<IBook>(
    {
    title: {type: String, required: true, maxLength: 150},
    author: {type: String, required: true },
    isbn: {type: String, required: true, unique: true},
    year: {
        type: Number, 
        required: true, 
        min: 1000,
        max: new Date().getFullYear()
    },
    publisherName: {type: Schema.Types.ObjectId, ref: "PublisherName", required: true }
    },
    { timestamps: true}
);

export const Book = model<IBook>("Book", bookSchema);