import { Router } from 'express';
import { Response } from 'express';
import { CitiesController } from './../controllers';

const router = Router();

router.get('/', (_, res: Response) => {
  res.send('Hello Word');
});

router.post(
  '/cities',
  CitiesController.createValidation,
  CitiesController.create,
);

router.get(
  '/cities',
  CitiesController.getAllValidation,
  CitiesController.getAll,
);

router.get(
  '/cities/:id',
  CitiesController.getByIdValidation,
  CitiesController.getById,
);

router.delete(
  '/cities/:id',
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById,
);

router.put(
  '/cities/:id',
  CitiesController.updateByIdValidation,
  CitiesController.updateById,
);

export { router };
