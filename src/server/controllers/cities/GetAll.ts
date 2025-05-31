import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { CitiesProvider } from '../../database/providers/cities';
import { UtilsValidation } from '../../shared/utils';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation(getSchema => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0, 'Page must be greater than 0'),
      limit: yup
        .number()
        .optional()
        .moreThan(0, 'Limit must be greater than 0'),
      filter: yup.string().optional(),
      id: yup.number().integer().optional().default(0),
    }),
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response,
): Promise<void> => {
  const statusCode = StatusCodes.OK;
  const result = await CitiesProvider.getAll(
    req.query.page || 1,
    req.query.limit || 5,
    req.query.filter || '',
    Number(req.query.id || 0),
  );

  const count = await CitiesProvider.count(req.query.filter || '');
  if (!UtilsValidation.handleControllerResult(result, res, statusCode, count)) {
    res.end();
  }
};
