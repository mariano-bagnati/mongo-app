import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uriDb = process.env.URI_DB;

// Creo un Cliente de la BD Mongo.
const client = new MongoClient(uriDb);

// Función asíncrona que establece la conexión del cliente "client" a la BD Mongo
const createConnectionMongo = async () => {
    try {
        await client.connect();
        console.log(`Connection to the Data Base established - (${new Date().toLocaleString()})`)
    } catch (error) {
        const msjError = `code: ${error.code} / codeName: ${error.codeName}`;
        console.log("Error atrapado en el catch - " + msjError);
    };
};

export { client, createConnectionMongo };
