import express from 'express';
import { agregarRegistro, desactivarRegistro, listarRegistros, obtenerRegistro } from '../../controllers/familyRecord/equipoAsignadoController.js';
import validarCampos from '../../middleware/validations/familyRecord/equipoAsignadoValidations.js';

const router = express.Router();

router.route('/')
    .post(validarCampos, agregarRegistro)
    .get(listarRegistros);

router.route('/:id')
    .get(obtenerRegistro)
    .patch(desactivarRegistro);

export default router;
