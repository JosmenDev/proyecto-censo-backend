import {body, validationResult} from 'express-validator'
import { respondWithError } from '../../../helpers/errors.js';

const validarCamposUsuario = [
    body('idempleado')
        .notEmpty()
        .withMessage('El campo "Empleado" es obligatorio'),
    body('username')
        .notEmpty()
        .withMessage('El campo "Nombre de Usuario" es obligatorio')
        .bail()
        .isNumeric()
        .withMessage('El nombre de usuario es el DNI, por lo tanto, es un valor numérico')
        .bail()
        .isLength({min: 8, max: 8})
        .withMessage('El nombre de usuario es el DNI, por lo tanto, tiene que tener 8 dígitos')
        .bail()
        .trim(),
    body('password')
        .notEmpty()
        .withMessage('El campo "Contraseña" es obligatorio'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            const mensajesError = errores.array().map(err => err.msg);
            return respondWithError( res, 400, mensajesError);
        }
        next();
    }
];

export default validarCamposUsuario;