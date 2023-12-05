import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uriDb = process.env.URI_DB;

const clientMongo = new MongoClient(uriDb);

const createConnectionMongo = async () => {
    try {
        await clientMongo.connect();
        console.log(`Connection to the Data Base established - (${new Date().toLocaleString()})`)
    } catch (error) {
        const msjError = `code: ${error.code} / codeName: ${error.codeName}`;
        console.log("Error atrapado en el catch - " + msjError);
    };
};

export { clientMongo, createConnectionMongo };
