import express from "express";
import 'dotenv/config';
import cors from "cors";
import bodyParser from "body-parser";

import { DataTypes, Sequelize } from "sequelize"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const Todo = sequelize.define("todos", {
  name: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
})

// Conserver mes données
// sequelize.sync()
// Reset des données
sequelize.sync({ force: true })

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3030

app.get('/random-between/:min/:max', async (req, res) => {
    const min = parseInt(req.params.min)
    const max = parseInt(req.params.max)
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    console.log('number : ' + random);
    const maTodo = await Todo.create({name: "ma todo 1", status: true})
    console.log(maTodo);
    
    res.send(random.toString());
})

app.post("/send-name", (req, res) => {
    const name = req.body.name
    console.log(name)
    res.json({ leNomFourni: name })
})
  

app.listen(port, () => {
    console.log('serveur running on port : ' + port);
})