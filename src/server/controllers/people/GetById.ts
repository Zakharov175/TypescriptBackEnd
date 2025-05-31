import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { PeopleProvider } from '../../database/providers/people';
import { UtilsValidation } from '../../shared/utils';
import { IParamProps } from '../../database/models';

export const getByIdValidation = validation(get => ({
  params: get<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const getById = async (
  req: Request<IParamProps>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const statusCode = StatusCodes.OK;
  if (!UtilsValidation.validateParamId(id, res)) return;
  const result = await PeopleProvider.getById(id);
  if (!UtilsValidation.handleControllerResult(result, res, statusCode)) {
    res.end();
  }
};
