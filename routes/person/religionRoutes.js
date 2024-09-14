import express from 'express';
import { actualizarRegistro, agregarRegistro, desactivarRegistro, listarRegistros, obtenerRegistro } from '../../controllers/person/religionController.js';

const router = express.Router();

router.route('/')
    .post(agregarRegistro)
    .get(listarRegistros)

router.route('/:id')
    .get(obtenerRegistro)
    .put(actualizarRegistro)
    .patch(desactivarRegistro)


export default router;