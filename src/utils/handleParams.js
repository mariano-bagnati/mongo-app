import { randomUUID } from "node:crypto";
import { getPizzas, getPizzaById, addPizza, deletePizzaById } from "../controller/controller.js";

const processParams = async (req) => {
    console.log(req, "< argumento que recibe processParams");
    const action = req[0];
    switch (action) {
        case "getPizzas":
            return await getPizzas();
        case "getPizzaById":
            return await getPizzaById(req[1]);
        case "addPizza":
            const ingredientes = req[1].split("-");
            const newPizza = {
                id: randomUUID(),
                ingredientes: ingredientes,
                nombre: req[2],
                precio: Number(req[3]),
                tamaño: req[4],
            };
            return await addPizza(newPizza);
        case "deletePizzaById":
            return await deletePizzaById(req[1]);
        default:
            return "Petición Incorrecta";    
    };
};

export { processParams };