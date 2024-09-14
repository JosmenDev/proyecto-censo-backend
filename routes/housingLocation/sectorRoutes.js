import express from 'express';
import { actualizarRegistro, agregarRegistro, desactivarRegistro, listarRegistros, obtenerRegistro } from '../../controllers/housingLocation/sectorController.js';
import validarCampos from '../../middleware/validations/housingLocation/sectorValidations.js';

const router = express.Router();

router.route('/')
    .post(validarCampos, agregarRegistro)
    .get(listarRegistros);

router.route('/:id')
    .get(obtenerRegistro)
    .put(validarCampos, actualizarRegistro)
    .patch(desactivarRegistro);

export default router;
