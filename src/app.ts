import express, { Application, Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/errorHandler";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

const getController = (req: Request, res: Response) => {
  res.send("First Project");
};

app.get("/", getController);

app.use(globalErrorHandler);
app.use(notFound);

// console.log(process.cwd());

export default app;
