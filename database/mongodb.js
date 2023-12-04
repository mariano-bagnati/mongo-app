import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uriDb = process.env.URI_DB;

const clientMongo = new MongoClient(uriDb);

const createConnectionMongo = async () => {
    await clientMongo.connect();
    console.log("Conexión a la Base de Datos establecida");
};

createConnectionMongo();
