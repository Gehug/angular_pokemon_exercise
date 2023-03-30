const express = require("express");
const Pokemon = require("./pokemon");
const cors = require("cors")

const HOSTNAME = "127.0.0.1";
const PORT = 3001;

// test1 = new Pokemon("bulbasaur", 1, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png");


let database = [];

const app = express();
app.use(cors())
app.use(express.json()); // add json usage !!!!!!!!!!

app.listen(PORT, () => {
    console.log(`Server Listener on http://${HOSTNAME}:${PORT}/`);
});

app.get("/inventory", (request, response) => {

    console.log(request.baseUrl); // Gets the base URL from the client back
    response.status(200).send(database); // make the status code 200 and add some information "Hello World"


});

app.post("/inventory", (request, response) => {

    const {name, id, sprite} = request.body;

    let newCatch = new Pokemon(name, id, sprite);
    database.push(newCatch.toJson());

    console.log(request.baseUrl); // Gets the base URL from the client back
    response.status(200).send("Added"); // make the status code 200 and add some information "Hello World"


});

