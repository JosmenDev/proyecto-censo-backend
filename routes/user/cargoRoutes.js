// importacio de dependencias
import express from 'express';
import { 
    agregarRegistro, 
    actualizarRegistro, 
    desactivarRegistro, 
    listarRegistros, 
    obtenerRegistro
} from "../../controllers/user/cargoController.js";

const router = express.Router();

router.route('/')
    .post(agregarRegistro)
    .get(listarRegistros)

router.route('/:id')
    .get(obtenerRegistro)
    .put(actualizarRegistro)
    .patch(desactivarRegistro)

export default router;