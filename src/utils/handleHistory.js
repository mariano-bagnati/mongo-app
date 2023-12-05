import fs, { read } from "node:fs";
import { randomUUID } from "node:crypto";

const PATH = "./src/log/historyUser.json";

const readHistory = () => {
    return JSON.parse(fs.readFileSync(PATH).toString());
};

const writeHistory = (state, id) => {
    const data = readHistory(); 
    const register = {
        id: id,
        date: new Date().toLocaleString(),
    };
    
    if (state === "connected") {
        data.userConnection.push(register);
    } else {
        data.userDisconnection.push(register)
    }
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(PATH, jsonData); 
};

export {readHistory, writeHistory};