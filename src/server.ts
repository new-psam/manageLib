import express from "express";
import { Database } from "./config/db";

const app = express();
const port = process.env.PORT || 3000;

async function start() {
    await Database.connect();

    app.get("/", (req, res)=> {
        res.send("API rodando e conectada ao MongoDB 🚀");
    });

    app.listen(port, ()=> {
        console.log(`✅ Servidor rodando em http//localhost:${port}`);
        console.log("aplicação ouvindo...");
    })
}

start();