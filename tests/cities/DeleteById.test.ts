import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('cities delete', () => {
  const deletedCity = (id: any) => testServer.delete(`/cities/${id}`).send();

  test('should return error when id does not exist', async () => {
    const response = await deletedCity(9999);
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});
