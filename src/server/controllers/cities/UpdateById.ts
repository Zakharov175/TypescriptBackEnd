import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ICity, IParamProps } from '../../database/models';
import { CitiesProvider } from '../../database/providers/cities';
import { UtilsValidation } from '../../shared/utils';

interface IBodyProps extends Omit<ICity, 'id'> {}

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
    }),
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const statusCode = StatusCodes.NO_CONTENT;
  if (!UtilsValidation.validateParamId(id, res)) return;
  const result = await CitiesProvider.updateById(id, req.body);
  if (!UtilsValidation.handleControllerResult(result, res, statusCode)) {
    res.end();
  }
};
