import express from 'express';
import { actualizarRegistro, agregarRegistro, desactivarRegistro, listarRegistros, obtenerRegistro } from '../../controllers/housingLocation/distritoController.js';
import validarCampos from '../../middleware/validations/housingLocation/distritoValidations.js';

const router = express.Router();

router.route('/')
    .post(validarCampos, agregarRegistro)
    .get(listarRegistros)

router.route('/:id')
    .get(obtenerRegistro)
    .put(validarCampos, actualizarRegistro)
    .patch(desactivarRegistro)

export default router;
