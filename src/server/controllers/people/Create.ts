import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { PeopleProvider } from '../../database/providers/people';
import { IPerson } from '../../database/models';
import { UtilsValidation } from '../../shared/utils';

interface IBodyProps extends Omit<IPerson, 'id'> {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      completeName: yup
        .string()
        .required()
        .min(3)
        .max(150)
        .matches(/^[^0-9]*$/, 'The name not be contain number.'),
      email: yup
        .string()
        .required()
        .email()
        .matches(/^[^0-9]*$/, 'The name not be contain number.'),
      cityId: yup.number().integer().required().min(1),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
): Promise<void> => {
  const statusCode = StatusCodes.NO_CONTENT;
  const result = await PeopleProvider.create(req.body);
  if (!UtilsValidation.handleControllerResult(result, res, statusCode)) {
    res.end();
  }
};
