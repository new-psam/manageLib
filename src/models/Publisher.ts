import { Schema, model, Document, Types } from "mongoose";
import {Book } from "./Book";

export interface IPublisher extends Document {
    name: string;
    books: Types.ObjectId[];
}

const publisherSchema = new Schema<IPublisher>({
    name: { type: String, required: true },
    books: [{type: Schema.Types.ObjectId, ref: "Book" }]
});

export const Publisher = model<IPublisher>("Publisher", publisherSchema);