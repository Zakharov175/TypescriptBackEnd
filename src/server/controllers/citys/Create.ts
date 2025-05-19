import { Request, Response } from "express";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";

interface CityModel {
  name: string;
  state: string;
}
interface IFilter {
  filter?: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<CityModel>(
    yup.object().shape({
      name: yup.string().required().min(3),
      state: yup.string().required().min(3),
    })
  ),

}));

export const create = async (
  req: Request<{}, {}, CityModel>,
  res: Response
) => {
  console.log(req.body);
  res.send("Create!");
  return;
};
