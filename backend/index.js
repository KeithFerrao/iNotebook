const connectToMongo = require("./db")
const express = require('express')
const authRouter = require("./routes/auth")
const notesRouter = require("./routes/notes")

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());

//Available Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})