import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { PeopleProvider } from '../../database/providers/people';
import { UtilsValidation } from '../../shared/utils';
import { IParamProps } from '../../database/models';

export const deleteByIdValidation = validation(get => ({
  params: get<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const deleteById = async (
  req: Request<IParamProps>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const statusCode = StatusCodes.NO_CONTENT;
  if (!UtilsValidation.validateParamId(id, res)) return;
  const result = await PeopleProvider.deleteById(id);
  if (!UtilsValidation.handleControllerResult(result, res, statusCode)) {
    res.end();
  }
};
