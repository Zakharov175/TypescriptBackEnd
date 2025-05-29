import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateParamId = (
  id: number | undefined,
  res: Response,
): id is number => {
  const numericId = Number(id);
  if (!numericId || isNaN(numericId) || numericId <= 0) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'The field id was not found or invalid',
      },
    });
    return false;
  }
  return true;
};
