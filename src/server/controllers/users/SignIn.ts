import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { UserProviders } from '../../database/providers/users';
import { IUser } from '../../database/models';
import { PasswordCrypto, JWTService } from '../../shared/services';

interface IBodyProps extends Omit<IUser, 'id' | 'name'> {}

export const signInValidation = validation(get => ({
  body: get<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required('Password is required'),
    }),
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body;
  const user = await UserProviders.getByEmail(email);
  if (user instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email or password wrong ',
      },
    });
    return;
  }
  const passwordMatch = await PasswordCrypto.verifyPassword(
    password,
    user.password,
  );
  if (!passwordMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email or password wrong',
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: user.id });
    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Error generation accesses token',
        },
      });
    }

    res.status(StatusCodes.OK).json({ accessToken });
    return;
  }
};
