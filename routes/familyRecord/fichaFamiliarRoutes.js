import express from 'express';
import { actualizarRegistro, agregarRegistro, eliminarRegistro, listarRegistros, obtenerRegistro } from '../../controllers/familyRecord/fichaFamiliarController.js';
import { actualizarRegistroPersona, agregarRegistroPersona, desactivarRegistroPersona, listarRegistrosPersona, obtenerRegistroPersona } from '../../controllers/person/personaController.js';
import validarCampos from '../../middleware/validations/familyRecord/FichaFamiliarValidations.js';
import validarCamposPersona from '../../middleware/validations/person/personaValidations.js';

const router = express.Router();

router.route('/')
    .post(validarCampos, agregarRegistro)
    .get(listarRegistros);
router.route('/:id')
    .get(obtenerRegistro)
    .put(actualizarRegistro)
    .patch(eliminarRegistro)

router.route('/:id/persona')
    .post(validarCamposPersona, agregarRegistroPersona)
    .get(listarRegistrosPersona)

router.route('/:id/persona/:idPersona')
    .get(obtenerRegistroPersona)
    .put(validarCamposPersona, actualizarRegistroPersona)
    .patch(desactivarRegistroPersona)

export default router;