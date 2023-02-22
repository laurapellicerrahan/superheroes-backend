var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

let superheroes = require("./superheroes.json")


app.use(express.json());

const port = 3003

const getHero = (id) => {
    const hero = superheroes.filter((oneHero) => oneHero.id === id);
    return hero;
}

app.get('/superheroes', (req, res) => {
    res.status(200).json(superheroes);
});

app.get('/superheroes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const hero = getHero(id);

    if (hero.length < 1) {
        res.status(404).json();
    }
    res.status(200).json(hero[0]);
});

app.post("/superheroes", (req, res) => {
    const info = req.body;
    //if opcional, se recomienda usarlo para evitar errores
    if (!("name" in info) || ("publisher" in info) || ("alter_ego" in info) || ("first_appearance" in info) || ("image" in info) || ("characters" in info)) {
        res.status(400).json;
    }

    const heroesIds = superheroes.map((hero) => hero.id);
    const maxId = Math.max(...heroesIds);
   


    const hero = {
        "id": maxId + 1,
        "name": info["name"],
        "publisher": info["publisher"],
        "alter_ego": info["alter_ego"],
        "first_appearance": info["first_appearance"],
        "image": info["image"],
        "characters": info["characters"]
    };
    //if opcional
    if (!(typeof hero.name === "string") || !(hero.name.length > 1)) {
        return res.status(400).json();
    }
    superheroes.push(hero);
    res.status(201).json(hero);


})

app.patch("/superheroes/:id", (req, res) => {
    let info = req.body;
    const id = parseInt(req.params.id);
    let currentHero = getHero(id);

    if (currentHero.length < 1) {
        res.status(404).json();
    }

    currentHero = currentHero[0];

    if ("name" in info) {
        currentHero.name = info["name"];
    }

    if ("publisher" in info) {
        currentHero.publisher = info["publisher"];
    }

    if ("alter_ego" in info) {
        currentHero.alter_ego = info["alter_ego"];
    }

    if ("first_appearance" in info) {
        currentHero.first_appearance = info["first_appearance"];
    }

    if ("image" in info) {
        currentHero.image = info["image"];
    }

    if ("characters" in info) {
        currentHero.characters = info["characters"];
    }


    superheroes = superheroes.filter((hero) => hero.id !== currentHero.id);
    superheroes.push(currentHero);
    res.status(200).json(currentHero);
})

app.delete("/superheroes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let currentHero = getHero(id);

    if (currentHero.length < 1) {
        res.status(404).json()
    }

    superheroes = superheroes.filter((hero) => hero.id !== id);
    res.status(204).json()
});

app.listen(port, () => {
    console.log(`El puerto es ${port}`)
})



/* const id = parseInt(req.params.id);
let currentHero = getHero(id);

if(currentHero.length <1){
    res.status(404).json()
}

superheroes = superheroes.filter((hero)=> hero.id !== id);
res.status(204).json() */