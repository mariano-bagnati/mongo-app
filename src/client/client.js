import net from "node:net";
import dotenv from "dotenv";
dotenv.config();

const options = {
    port: process.env.PORT ?? 2323, 
    host: process.env.HOST ?? "localhost",
};

const clientTCP = net.connect(options);

clientTCP.on("connect", () => {
    console.log(`Client connected - (${new Date().toLocaleString()})`);
    const args = process.argv.splice(2);
    clientTCP.write(JSON.stringify(args));
});

clientTCP.on("data", (bufferData) => {
    const data = JSON.parse(bufferData.toString());
    console.log(data, " < esto es lo que recibe el cliente desde el servidor");
    clientTCP.end();
    console.log(`Client disconnected - (${new Date().toLocaleString()}`);
});
