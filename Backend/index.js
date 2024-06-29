import connectToMongo from "./Database/db.js";
import express from "express";
import auth from "./routes/auth.js";
import notes from "./routes/notes.js";
import cors from 'cors'
import 'dotenv/config.js'
const app = express();
const port = 400;
connectToMongo();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening http://localhost:${port}`);
});
