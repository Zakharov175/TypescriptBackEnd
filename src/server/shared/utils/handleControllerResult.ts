import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleControllerResult = <T>(
  result: T | Error,
  res: Response,
  successStatus: number,
  count?: number | Error,
): result is Error => {
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
    return true;
  }
  if (count instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message,
      },
    });
    return true;
  }

  if (successStatus === StatusCodes.NO_CONTENT) {
    res.status(StatusCodes.NO_CONTENT).send();
    return false;
  }

  if (typeof count === 'number') {
    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);
    res.status(successStatus).json({ data: result, total: count });
  } else {
    res.status(successStatus).json(result);
  }

  return false;
};
