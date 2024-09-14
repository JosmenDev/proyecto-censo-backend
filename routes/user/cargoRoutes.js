// importacio de dependencias
import express from 'express';
import { 
    agregarRegistro, 
    actualizarRegistro, 
    desactivarRegistro, 
    listarRegistros, 
    obtenerRegistro
} from "../../controllers/user/cargoController.js";
import validarCampo from '../../middleware/validations/defaultValidations.js';

const router = express.Router();

router.route('/')
    .post(validarCampo, agregarRegistro)
    .get(listarRegistros)

router.route('/:id')
    .get(obtenerRegistro)
    .put(validarCampo, actualizarRegistro)
    .patch(desactivarRegistro)

export default router;