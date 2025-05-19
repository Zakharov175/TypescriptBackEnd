import { Router } from "express";
import { Response } from "express";
import { CitiesController } from "./../controllers";

const router = Router();

router.get("/", (_, res: Response) => {
  res.send("Hello Word");
});

router.post(
  "/cities",
  CitiesController.createValidation,
  CitiesController.create
);

router.get(
  "/cities",
  CitiesController.getAllValidation,
  CitiesController.getAll
);

export { router };
