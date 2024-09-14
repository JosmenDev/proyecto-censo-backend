import {body, validationResult} from 'express-validator'
import { respondWithError } from '../../../helpers/errors.js';

const validarCamposRol = [
    body('id')
        .notEmpty()
        .withMessage('El campo "ID" es obligatorio')
        .trim(),
    body('nombre')
        .notEmpty()
        .withMessage('El campo "nombre" es obligatorio')
        .trim(),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            const mensajesError = errores.array().map(err => err.msg);
            return respondWithError( res, 400, mensajesError);
        }
        next();
    }
];

export default validarCamposRol;