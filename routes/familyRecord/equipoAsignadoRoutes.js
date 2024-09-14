import express from 'express';
import { agregarRegistro, desactivarRegistro, listarRegistros, obtenerRegistro } from '../../controllers/familyRecord/equipoAsignadoController.js';

const router = express.Router();

router.route('/')
    .post(agregarRegistro)
    .get(listarRegistros);

router.route('/:id')
    .get(obtenerRegistro)
    .patch(desactivarRegistro);

export default router;
