const connectToMongo = require("./db")
const express = require('express')
const authRouter = require("./routes/auth")
const notesRouter = require("./routes/notes")
const cors = require('cors')

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

//Available Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.listen(port, () => {
  console.log(`iNotebook App listening on port ${port}`)
})