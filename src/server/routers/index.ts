import { Router } from 'express';
import { Response } from 'express';
import { CitiesController, PeopleController,UsersControllers } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/', (_, res: Response) => {
  res.send('Hello Word');
});

router.post('/cities', ensureAuthenticated, CitiesController.createValidation,CitiesController.create);
router.get('/cities', ensureAuthenticated, CitiesController.getAllValidation,CitiesController.getAll);
router.get('/cities/:id', ensureAuthenticated, CitiesController.getByIdValidation,CitiesController.getById);
router.delete('/cities/:id', ensureAuthenticated, CitiesController.deleteByIdValidation,CitiesController.deleteById);
router.put('/cities/:id', ensureAuthenticated, CitiesController.updateByIdValidation,CitiesController.updateById);

router.post('/people', ensureAuthenticated, PeopleController.createValidation,PeopleController.create);
router.get('/people',  ensureAuthenticated, PeopleController.getAllValidation,PeopleController.getAll);
router.get('/people/:id', ensureAuthenticated, PeopleController.getByIdValidation,PeopleController.getById);
router.delete('/people/:id', ensureAuthenticated, PeopleController.deleteByIdValidation,PeopleController.deleteById);
router.put('/people/:id', ensureAuthenticated, PeopleController.updateByIdValidation,PeopleController.updateById);

router.post('/login',UsersControllers.signInValidation,UsersControllers.signIn);
router.post('/register',UsersControllers.signUpValidation,UsersControllers.signUp);

export { router };
