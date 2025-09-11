import { Request, Response } from "express";
import { Book } from "../models/Book";
import { Publisher } from "../models/Publisher";
import { Types } from "mongoose";

export class BookController {
    async create(req: Request, res: Response){
        try {
            const { title, author, isbn, year, publisherName} = req.body;
            //busca e cria o publisher
            let publisher = await Publisher.findOne({name: publisherName});
            if (!publisher) {
                publisher = await Publisher.create({name: publisherName, books: [] });
            }

            //Cria o livro
            const book = await Book.create({
                title,
                author,
                isbn,
                year,
                publisherName: publisher._id
            });
            publisher.books.push(book._id as Types.ObjectId);
            await publisher.save();

            res.status(201).json(book);
        }catch (error) {
            console.error(error);
            res.status(500).json({message: "Erro ao criar livro"});
        }
    }

    async getAll(req: Request, res: Response){
        try {
            const books = await Book.find();
            return res.json(books);
        } catch (err) {
            return res.status(500).json({
                error: "Erro ao buscar livros",
                details: err,
            });
        }
    }

    async getById(req: Request, res: Response) {
        try { 
            const { id } = req.params;
            const book = await Book.findById(id);
            if(!book) {
                return res.status(404).json({error: "Livro não encontrado"});
            }
            return res.status(200).json(book);
        } catch (err) {
            return res.status(400).json({
                error: "ID inválido",
                details: err,
            });
        }
    }

    async update(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true});

            if (!updatedBook) {
                return res.status(404).json({error: "Livro não encontrado"});
            }
            return res.status(201).json(updatedBook);
        } catch (err) {
            return res.status(400).json({error: "Erro ao atualizar livro", details: err});
        }
    }

    async delete(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const deletedBook = await Book.findByIdAndDelete(id);

            if(!deletedBook){
                return res.status(404).json({error: "Livro não encontrado"});
            }

            return res.json({message: "Livro deletado com sucesso!!"});

        }catch (err) {
            return res.status(400).json({error: "Erro ao deletar livro", details: err});
        }
    }
}