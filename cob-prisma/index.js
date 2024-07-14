import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(router);

app.listen(5000, () => console.log("Server up and running..."));
