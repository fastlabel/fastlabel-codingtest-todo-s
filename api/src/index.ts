import "reflect-metadata";
import "../database";
import express from "express";
import cors from "cors";
import bodyParser, { urlencoded } from "body-parser";
import { RegisterRoutes } from "./middlewares/tsoa/routes";
import { RequestHandler } from "./middlewares/request-handler";

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true, limit: "1gb" }));
app.use(bodyParser.json({ limit: "1gb" }));
app.use(RequestHandler.start);
app.use(RequestHandler.error);
RegisterRoutes(app);

// health check
app.get("/", (_, res) => {
  res.json({ message: "Hello World!" });
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Running api at http://localhost:${port}`);
});
server.timeout = 10.1 * 60 * 1000; // 10 minutes +
server.keepAliveTimeout = 10 * 60 * 1000; // 10 minutes
