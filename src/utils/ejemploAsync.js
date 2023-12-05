import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uriDb = process.env.URI_DB;

const clientMongo = new MongoClient(uriDb);

const createConnectionMongo1 = async () => {
    await clientMongo.connect();
    console.log(`Connection to the Data Base established - (${new Date().toLocaleString()})`);
};

// await createConnectionMongo1();

// Para manejar errores en funciones asíncronas, podemos usar bloques try/catch. 
// Aquí hay un ejemplo de como manejar errores en la función:

const createConnectionMongo2 = async () => {
    try {
        await clientMongo.connect();
        console.log(`Connection to the Data Base established - (${new Date().toLocaleString()})`)
    } catch (error) {
        const msjError = `code: ${error.code} / codeName: ${error.codeName}`;
        console.log("Error atrapado en el catch - " + msjError);
    };
};

// await createConnectionMongo2();

// -------------------------------------------------------------
// sincrónica
const waitDelay = () => {
    setTimeout(() => {
        console.log("Hola desde un archivo síncrono");
    }, 2000);
};

//waitDelay();

// asincrónica
const waitDelay2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNum = Math.random() < 0.5;
            if (randomNum === true) {
                resolve("Se resolvió exitosamente");
            } else {
                reject("Se resolvió de forma no exitosa");
            };
        }, 2000);
    });
};

const responsePromise = async () => {
    try {
        const resolve = await waitDelay2();
        console.log(resolve);
    } catch (error) {
        console.log("Error en la validación - " + error);
    };
};

await responsePromise();
