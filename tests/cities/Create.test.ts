import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cities create', () => {
  const validCity = { name: 'Caxias do Sul', state: 'Ceará' };
  const postCity = (data: any) => testServer.post('/cities').send(data);

  test('should create register', async () => {
    const response = await postCity(validCity);
    expect(response.statusCode).toEqual(StatusCodes.CREATED);
  });

  test('should return error when name and state is too short', async () => {
    const response = await postCity({
      name: 'aa',
      state: 'Ce',
    });
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body.errors.body.name).toBe(
      'name must be at least 3 characters',
    );
    expect(response.body.errors.body.state).toBe(
      'state must be at least 3 characters',
    );
  });

  test('should return error when name is not provided', async () => {
    const response = await await postCity({ state: 'Cea' });
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.errors.body.name).toBe('name is a required field');
  });

  test('should return error when state is not provided', async () => {
    const response = await postCity({ name: 'Cea' });
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.errors.body.state).toBe('state is a required field');
  });

  test('The name cannot contain numbers.', async () => {
    const response = await postCity({ name: 1123, state: 'Ceará' });
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.errors.body.name).toBe(
      'The name not be contain number.',
    );
  });

  test('The state cannot contain numbers.', async () => {
    const response = await postCity({ name: 'Fortaleza', state: 1123 });
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.errors.body.state).toBe(
      'The state not be contain number.',
    );
  });
});
