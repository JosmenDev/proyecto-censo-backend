import { body, validationResult } from 'express-validator';
import { respondWithError } from '../../../helpers/errors.js';

const validarCamposDistrito = [
    body('nombre')
        .notEmpty()
        .withMessage('El campo "nombre" es obligatorio')
        .trim(),
    body('idprovincia')
        .notEmpty()
        .withMessage('El campo "Provincia" es obligatorio'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            const mensajesError = errores.array().map( err => err.msg);
            return respondWithError(res, 400, mensajesError);
        }
        next();
    }
]

export default validarCamposDistrito;