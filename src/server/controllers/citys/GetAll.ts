import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware/Validation";
import * as yup from "yup";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup
        .number()
        .optional()
        .moreThan(0, "Page must be greater than 0"),
      limit: yup
        .number()
        .optional()
        .moreThan(0, "Limit must be greater than 0"),
      filter: yup.string().optional(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  console.log(req.query);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Not implement yet");
};
