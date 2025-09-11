import { Request, Response } from "express";
import { Publisher } from "../models/Publisher";
import { Book } from "../models/Book";

export class PublisherController {


    async getAll(req: Request, res: Response) {
        try{
            const publishers = await Publisher.find().populate("books");//mostra dados dos livros
            res.json(publishers);
        }catch (err) {
            res.status(400).json({error: "Erro ao listar editoras", details: err});
        }
    }

    async getById(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const publisher = await Publisher.findById(id).populate("books");
            
            if(!publisher) return res.status(404).json({error: "Editora não encontrada!"});
            res.status(200).json(publisher);
        }catch (err) {
            res.status(400).json({ error: "Erro ao buscar a editora", details: err });
        }
    }
}