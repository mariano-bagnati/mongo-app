import net from "node:net";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT ?? 2323;

const serverTCP = net.createServer();

serverTCP.on("connection", (socket) => {
    socket.on("data", () => {

    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });

    socket.on("error", () => {
        console.log("Client error");
    });


    console.log("Client connected", new Date().toLocaleString());
});

serverTCP.listen(port, () => {
    console.log(`Server is up on ${port} (${new Date().toLocaleString()})`);
});
