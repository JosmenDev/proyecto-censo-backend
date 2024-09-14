import { body, validationResult } from 'express-validator';
import { respondWithError } from '../../../helpers/errors.js';

const validarCamposCentroPoblado = [
    body('nombre')
        .notEmpty()
        .withMessage('El campo "nombre" es obligatorio')
        .trim(),
    body('iddistrito')
        .notEmpty()
        .withMessage('El campo "Distrito" es obligatorio'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            const mensajesError = errores.array().map( err => err.msg);
            return respondWithError(res, 400, mensajesError);
        }
        next();
    }
]

export default validarCamposCentroPoblado;