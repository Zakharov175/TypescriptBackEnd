import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { UserProviders } from '../../database/providers/users';
import { IUser } from '../../database/models';
import { UtilsValidation } from '../../shared/utils';

interface IBodyProps extends Omit<IUser, 'id'> {}

export const signUpValidation = validation(get => ({
  body: get<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,10}$/,
          'Password must include 1 uppercase 1 lowercase 1 number and 1 especial character',
        ),
    }),
  ),
}));

export const signUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
): Promise<void> => {
  const statusCode = StatusCodes.NO_CONTENT;
  const result = await UserProviders.create(req.body);
  if (!UtilsValidation.handleControllerResult(result, res, statusCode)) {
    res.end();
  }
};
