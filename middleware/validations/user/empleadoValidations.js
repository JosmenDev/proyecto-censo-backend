import { body, validationResult } from "express-validator";
import { respondWithError } from "../../../helpers/errors.js";

const validarCamposEmpleado = [
    body('dni')
        .notEmpty()
        .withMessage('El campo "DNI" es obligatorio')
        .bail()
        .isNumeric()
        .withMessage('El DNI es numérico')
        .bail()
        .isLength({min:8, max: 8})
        .withMessage('El DNI tiene un valor de 8 dígitos')
        .bail()
        .trim(),
    body('nombre')
        .notEmpty()
        .withMessage('El campo "Nombre" es obligatorio')
        .trim(),
    body('apellidos')
        .notEmpty()
        .withMessage('El campo "Apellidos" es obligatorio')
        .trim(),
    body('idcargo')
        .notEmpty()
        .withMessage('El campo "Cargo" es obligatorio'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            const mensajesError = errores.array().map(err => err.msg);
            return respondWithError( res, 400, mensajesError);
        }
        next();
    }
];

export default validarCamposEmpleado;