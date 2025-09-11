import express from "express";
import dotenv from "dotenv";
import { Database } from "./config/db";
import bookRoutes from "./routes/bookRoutes";
import publisherRoutes from "./routes/publisherRoutes";

//dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/books", bookRoutes);
app.use("/publishers", publisherRoutes);

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