import express from 'express';
import { actualizarRegistro, agregarRegistro, desactivarRegistro, listarRegistros, obtenerRegistro } from '../../controllers/person/nivelEducativoController.js';

const router = express.Router();

router.route('/')
    .post(agregarRegistro)
    .get(listarRegistros);

router.route('/')
    .get(obtenerRegistro)
    .put(actualizarRegistro)
    .patch(desactivarRegistro);

export default router;