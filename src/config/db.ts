import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export class Database {
    static async connect(): Promise<void> {
        try {
            const uri = process.env.MONGO_URI;
            if (!uri) throw new Error("MONGO_URI não definida no .env");
            
            await mongoose.connect(uri, {
                dbName: "library"
            });
            console.log("✅ MongoDb conectado com sucesso");
        }catch (err) {
            console.error("❌ Erro ao conectar ao MongoDB: ", err);
            process.exit(1);
        }
    }
}