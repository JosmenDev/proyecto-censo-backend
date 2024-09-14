import express from 'express';
import { autenticar, comprobarToken, confirmar } from '../../controllers/person/authController.js';

const router = express.Router();

router.post('/login', autenticar);
router.route('/confirmar/:token')
    .get(comprobarToken)
    .post(confirmar);

export default router;