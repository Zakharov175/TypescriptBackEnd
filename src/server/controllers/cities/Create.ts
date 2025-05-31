import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ICity } from 'server/database/models';
import { CitiesProvider } from '../../database/providers/cities';
import { UtilsValidation } from '../../shared/utils';

interface IBodyProps extends Omit<ICity, 'id'> {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup
        .string()
        .required()
        .min(3)
        .max(150)
        .matches(/^[^0-9]*$/, 'The name not be contain number.'),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
): Promise<void> => {
  const statusCode = StatusCodes.CREATED;
  const result = await CitiesProvider.create(req.body);
  if (!UtilsValidation.handleControllerResult(result, res, statusCode)) {
    res.end();
  }
};
