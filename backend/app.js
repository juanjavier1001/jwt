import express from "express";
import router from "./routes/index.routes.js";
const app = express();

app.use(express.json());
app.use("/api", router);

export default app;

/* import express from "express";
import router from "./routes/index.routes.js";

const app = express();
app.listen(3000, console.log("on ..."));

app.use(router);

app.get("/", (req, res) => {
  res.send("hola pa");
});
 */
