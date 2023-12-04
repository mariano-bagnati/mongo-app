import net from "node:net";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT ?? 2323;

const serverTCP = net.createServer();

serverTCP.on("connection", (socket) => {
    socket.on("data", (bufferData) => {
        const data = JSON.parse(bufferData.toString());
        console.log(data);
    });

    socket.on("close", () => {
        console.log(`Client disconnected - (${new Date().toLocaleString()})`);
    });

    socket.on("error", () => {
        console.log("Client error");
    });

    console.log(`Client disconnected - (${new Date().toLocaleString()})`);
});

serverTCP.listen(port, () => {
    console.log(`Server is up on ${port} (${new Date().toLocaleString()})`);
});
