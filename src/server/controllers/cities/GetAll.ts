import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware/Validation';
import { CitiesProvider } from '../../database/providers/cities';
import * as yup from 'yup';

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
  const result = await CitiesProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || '',
    Number(req.query.id),
  );

  const count = await CitiesProvider.count(req.query.filter || '');

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
    return;
  }

  if (count instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
    return;
  }

  res.status(StatusCodes.OK).json({
    total: count,
    data: result,
  });
};
