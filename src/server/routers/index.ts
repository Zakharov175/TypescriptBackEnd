import { Router } from 'express';
import { Response } from 'express';
import { CitiesController, PeopleController } from './../controllers';

const router = Router();

router.get('/', (_, res: Response) => {
  res.send('Hello Word');
});

router.post('/cities',CitiesController.createValidation,CitiesController.create);
router.get('/cities', CitiesController.getAllValidation,CitiesController.getAll);
router.get('/cities/:id',CitiesController.getByIdValidation,CitiesController.getById);
router.delete('/cities/:id',CitiesController.deleteByIdValidation,CitiesController.deleteById);
router.put('/cities/:id',CitiesController.updateByIdValidation,CitiesController.updateById);

router.post('/people',PeopleController.createValidation,PeopleController.create);
router.get('/people', PeopleController.getAllValidation,PeopleController.getAll);
router.get('/people/:id',PeopleController.getByIdValidation,PeopleController.getById);
router.delete('/people/:id',PeopleController.deleteByIdValidation,PeopleController.deleteById);
router.put('/people/:id',PeopleController.updateByIdValidation,PeopleController.updateById);


export { router };
