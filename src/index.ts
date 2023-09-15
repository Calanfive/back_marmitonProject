import express from "express";
import 'dotenv/config';
import cors from "cors";
import bodyParser from "body-parser";
import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const Recipe = sequelize.define("recipes", {
  recette: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.NUMBER,
  },
  duree: {
    type: DataTypes.NUMBER,
  },
  url: {
    type: DataTypes.STRING,
  },
})

// Conserver mes données
sequelize.sync()
// Reset des données
// sequelize.sync({ force: true })

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3030

app.get('/recipes', async (req, res) => {
    const allRecipes = await Recipe.findAll();
    console.log(allRecipes);
    res.json(allRecipes);
})

app.post("/recipes", async (req, res) => {
    
    const nouvelleRecette = await Recipe.create({
        recette: req.body.nom_recette,
        note: req.body.note,
        duree: req.body.duree,
        url: req.body.lien_image
    })
    console.log(nouvelleRecette)
    res.json(nouvelleRecette)
})

app.listen(port, () => {
    console.log('serveur running on port : ' + port);
})