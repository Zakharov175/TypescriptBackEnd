import { Router } from "express";
import { Request, Response } from "express";
import {StatusCodes} from "http-status-codes";

const router = Router();

router.get("/", (_, res: Response) => {
  res.send("Hello Word");
});

router.post("/test", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Hello Word");
});

export { router };
