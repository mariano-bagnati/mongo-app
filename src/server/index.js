import net from "node:net";
import dotenv from "dotenv";
import { readHistory, writeHistory } from "../utils/handleHistory.js";
import { randomUUID } from "node:crypto";
import { createConnectionMongo } from "../database/mongodb.js";
dotenv.config();

const port = process.env.PORT ?? 2323;

const serverTCP = net.createServer();

serverTCP.on("connection", (socket) => {

    const id = randomUUID();

    socket.on("data", (bufferData) => {
        const data = JSON.parse(bufferData.toString());
        console.log(data);
    });

    socket.on("close", () => {
        console.log(`Client disconnected - (${new Date().toLocaleString()})`);
        writeHistory("disconnected", id);
    });

    socket.on("error", () => {
        console.log("Client error");
    });

    console.log(`Client connected - (${new Date().toLocaleString()})`);
    writeHistory("connected", id);
});

serverTCP.listen(port, async () => {
    console.log(`Server is up on ${port} (${new Date().toLocaleString()})`);
    await createConnectionMongo();
});
