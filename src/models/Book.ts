import { SendHandle } from 'child_process';
import mongoose, { Schema, Document } from 'mongoose';
import { maxLength, minSize } from 'zod';
import { required } from 'zod/v4/core/util.cjs';

export interface IBook extends Document {
    title: string;
    author: string;
    isbn: string;
    year: number;
    publisher?: mongoose.Types.ObjectId; 
}

const BookSchema: Schema = new Schema(
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
    publisher: {type: Schema.Types.ObjectId, ref: "Publisher" },
    },
    { timestamps: true}
);

export const Book = mongoose.model<IBook>("Book", BookSchema);