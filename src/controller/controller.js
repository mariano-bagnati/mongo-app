// Importar la instancia "Client" desde el módulo mongodb.js de la carpeta /database.
import { client } from "../database/mongodb.js";

// Función para obtener la colección de pizzas de la BD Mongo.
const getPizzasCollection = async () => {
    try {
        // Obtener la referencia a la BD desde la instancia Client.
        const database = client.db();
        // Obtener la colección llamada "pizzas".
        const collection = database.collection("pizzas");
        // Devolver la colección.
        return collection;
    } catch (error) {
        // Manejar errores al conectar la BD.
        console.error("Error al conectar a la Base de Datos:", error);
        // Lanzar el error para que sea manejado por el llamador de la función.
        throw error;
    };
};

// Función para obtener todas las pizzas de la colección.
const getPizzas = async () => {
    try {
        // Obtener la colección de pizzas de la BD.
        const collection = await getPizzasCollection();
        // Obtener todas las pizzas y convertirlas en un array.
        const pizzas = await collection.find().toArray();
        // Devolver al array de pizzas.
        return pizzas;
    } catch (error) {
        // Manejar errores al conectar la BD.
        console.error("Error al obtener las pizzas", error);
        throw error;
    };
};

// Función para obtener una pizza por su Id.
const getPizzaById = async (id) => {
    console.log(id, " < este es el argumento de la función getPizzaById");
    console.log(typeof id);
    try {
      // Obtener la colección de pizzas.
      const collection = await getPizzasCollection();
      // Buscar y devolver la pizza con el Id proporcionado.
      const pizza = await collection.findOne({ id: id });
      return pizza;
    } catch (error) {
      console.error("Error al pedir la pizza por Id:", error);
      throw error;
    };    
};

// Función para agregar una nueva pizza a la colección.
const addPizza = async (nuevaPizza) => {
    try {
        // Obtener la colección de pizzas.
        const collection = await getPizzasCollection();
        // Verificar si ya existe una pizza con el nombre proporcionado.
        const existingPizza = await collection.findOne({nombre: nuevaPizza.nombre});
        if (existingPizza) {
           // Devolver un mensaje indicado que la pizza ya existe.
           return "Ya existe una pizza con el nombre proporcionado";
        } 
        // Insertar la nueva pizza a la colección.
        await collection.insertOne(nuevaPizza);
        // Devolver un mensaje indicando que la pizza fue agregada con éxito.
        return "Pizza agregada con éxito";
    } catch (error) {
        console.error("Error al agregar la pizza:", error);
    };
};

// Función para eliminar una pizza por su Id.
const deletePizzaById = async (id) => {
    try {
        // Obtener la colección de pizzas.
        const collection = await getPizzasCollection();
        // Buscar la pizza por su Id.
        const pizza = await collection.findOne({ id: id });
        if (pizza) {
            // Si la pizza existe, eliminarla de la colección.
            await collection.deleteOne({ id: id });
            // Devolver un mensaje diciendo que la pizza fue borrada con éxito.
            return "Pizza borrada con éxito";
        };
            // Si la pizza no existe, devolver un mensaje indicando que no se encontró la pizza.
            return "La pizza no existe";
    } catch (error) {
        console.error("Error al borrar la pizza por Id:", error);
        throw error;
    };    
};

export { getPizzas, getPizzaById, deletePizzaById, addPizza };

