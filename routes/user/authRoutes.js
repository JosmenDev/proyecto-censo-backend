import express from 'express';
import { autenticar, comprobarToken, confirmar, perfil } from '../../controllers/user/authController.js';
import validarCampos from '../../middleware/validations/user/authValidations.js';
import { checkAuth } from '../../middleware/authMiddleware.js';

const router = express.Router();

router
    .post('/login', validarCampos, autenticar)
    .get('/perfil', checkAuth, perfil);
router.route('/confirmar/:token')
    .get(comprobarToken)
    .post(confirmar);

export default router;