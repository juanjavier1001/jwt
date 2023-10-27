import app from "./app.js";
import connectdb from "./db.js";

connectdb();

app.listen(3000, console.log("server on ..."));
