import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { PeopleProvider } from '../../database/providers/people';
import { IPerson, IParamProps } from '../../database/models';
import { UtilsValidation } from '../../shared/utils';

interface IBodyProps extends Omit<IPerson, 'id'> {}

export const updateByIdValidation = validation(get => ({
  body: get<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      cityId: yup.number().integer().required(),
      completeName: yup.string().required().min(3),
    }),
  ),
  params: get<IParamProps>(
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
  const result = await PeopleProvider.updateById(id, req.body);
  if (!UtilsValidation.handleControllerResult(result, res, statusCode)) {
    res.end();
  }
};
