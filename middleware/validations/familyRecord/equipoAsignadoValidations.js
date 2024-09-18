import { body, validationResult } from "express-validator";
import { respondWithError } from "../../../helpers/errors.js";

const validarCamposEquipoAsignado = [
    body('idsector')
        .notEmpty()
        .withMessage('El campo "sector" es obligatorio'),
    body('idempleado')
        .notEmpty()
        .withMessage('El campo "empleado" es obligatorio'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            const mensajesError = errores.array().map(err => err.msg);
            return respondWithError(res, 400, mensajesError);
        }
        next();
    }
];

export default validarCamposEquipoAsignado;