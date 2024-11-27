import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/router";
const httpStatus = require("http-status");
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOTFOUND || 404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
