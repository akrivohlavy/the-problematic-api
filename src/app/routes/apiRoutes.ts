import { createRouter } from 'unicore';

import * as helloController from '../controllers/api/helloController';
import * as problemController from '../controllers/api/problem.controller';

const router = createRouter();

router.all('/hello', helloController.anyHello);

router.get('/problems', problemController.listProblems);
router.post('/problems', problemController.createProblem);

router.get('/problems/:id', problemController.getProblem);
router.put('/problems/:id', problemController.updateProblem);
router.delete('/problems/:id', problemController.deleteProblem);

router.post('/problems/:id/answer', problemController.answerProblem);

export default router;
