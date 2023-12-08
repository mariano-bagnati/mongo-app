// Importación de módulos
import net from "node:net"; // Importo desde Node
import dotenv from "dotenv"; // Dependencia para leer variables de entorno
import { readHistory, writeHistory } from "../utils/handleHistory.js";
import { randomUUID } from "node:crypto"; // Importo desde Node
import { createConnectionMongo } from "../database/mongodb.js";
import { processParams } from "../utils/handleParams.js";
dotenv.config();

// Creación de Servidor TCP -> Servicio queda en escucha para suministrar datos

// Indico puerto a través de donde queda en escucha el Servidor
const port = process.env.PORT ?? 2323;

// Creo Servidor
const serverTCP = net.createServer();

serverTCP.on("connection", async (socket) => {

    const id = randomUUID();

    socket.on("data", async (bufferData) => {  // Datos recibidos desde el Cliente
        const data = JSON.parse(bufferData.toString());
        const response = await processParams(data);
        console.log(response, "< es la respuesta de processParams");
        socket.write(JSON.stringify(response));
    });

    socket.on("close", () => {
        console.log(`Client disconnected - (${new Date().toLocaleString()}`);
        writeHistory("disconnected", id);
    });

    socket.on("error", () => {
        console.log("Client error");
    });

    console.log(`Client connected - (${new Date().toLocaleString()})`);

    writeHistory("connected", id);
});

// Servidor queda "arriba" en el puerto "port" y en escucha y a la espera de una conexión del Cliente
serverTCP.listen(port, async () => {
    console.log(`Server is up on ${port} (${new Date().toLocaleString()})`);
    await createConnectionMongo(); // El Servidor intenta la conexión a la BD Mongo
});
