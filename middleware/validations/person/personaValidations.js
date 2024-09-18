import { body, param, validationResult } from "express-validator";
import { respondWithError } from "../../../helpers/errors.js";

const validarCamposPersona = [
    param('id')
        .notEmpty()
        .withMessage('El campo "Ficha Familiar es obligatorio"'),
    body('datosPersona.nombres')
        .notEmpty()
        .withMessage('El campo "Nombres" es obligatorio')
        .trim(),
    body('datosPersona.apaterno')
        .notEmpty()
        .withMessage('El campo "Apellido Paterno" es obligatorio')
        .trim(),
    body('datosPersona.amaterno')
        .notEmpty()
        .withMessage('El campo "Apellido Materno" es obligatorio')
        .trim(),
    body('datosPersona.dni')
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
    body('datosPersona.estado_dni')
        .notEmpty()
        .withMessage('El campo "Estado de DNI" es obligatorio')
        .trim(),
    body('datosPersona.fecha_nacimiento')
        .notEmpty()
        .withMessage('El campo "Fecha de Nacimiento" es obligatorio')
        .trim(),
    body('datosPersona.sexo')
        .notEmpty()
        .withMessage('El campo "Sexo" es obligatorio')
        .trim(),
    body('datosPersona.idparentesco')
        .notEmpty()
        .withMessage('El campo "Parentesco" es obligatorio'),
    body('datosPersona.gestante')
        .notEmpty()
        .withMessage('El campo "Gestante" es obligatorio'),
    body('datosPersona.puerpedio')
        .notEmpty()
        .withMessage('El campo "Puerpedio" es obligatorio'),
    body('datosPersona.idnivel_educativo')
        .notEmpty()
        .withMessage('El campo "Nivel Educativo" es obligatorio'),
    body('datosPersona.idocupacion')
        .notEmpty()
        .withMessage('El campo "Ocupación" es obligatorio'),
    body('datosPersona.idreligion')
        .notEmpty()
        .withMessage('El campo "Parentesco" es obligatorio'),
    body('datosPersona.telefono')
        .notEmpty()
        .withMessage('El campo "Teléfono" es obligatorio')
        .isNumeric()
        .withMessage('El campo "Teléfono" es numérico'),
    body('datosPersona.idcargo_comunidad')
        .notEmpty()
        .withMessage('El campo "Cargo en Comunidad" es obligatorio'),
    body('datosPersona.idseguro_salud')
        .notEmpty()
        .withMessage('El campo "Seguro de Salud" es obligatorio'),
    body('datosPersona.idtipo_discapacidad')
        .notEmpty()
        .withMessage('El campo "Tipo de Discapacidad" es obligatorio'),
    body('datosPersona.carnet_discapacidad')
        .notEmpty()
        .withMessage('El campo "Carnet de Discapacidad" es obligatorio'),
    body('datosPersona.idaccion_emergencia')
        .notEmpty()
        .withMessage('El campo "Acción de emergencia" es obligatorio'),
    body('datosPersona.idgrupo_etnico')
        .notEmpty()
        .withMessage('El campo "Grupo étnico" es obligatorio'),
    body('datosAntecedentesRiesgo')
        .isArray()
        .withMessage('Se debe hacer un arreglo de antecedentes de riesgo')
        .bail()
        .custom( arr => {
            if (arr.length === 0) {
                throw new Error('El arreglo de antecedentes de riesgo no puede estar vacío')
            }
            return true;
        }),
    body('datosMediosInformacion')
        .isArray()
        .withMessage('Se tiene que hacer un arreglo de medios de información')
        .bail()
        .custom(arr => {
            if (arr.length === 0) {
                throw new Error('El arreglo de medios de información no puede estar vacío')
            }
            return true;
        }),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            const mensajesError = errores.array().map(err => err.msg);
            return respondWithError(res, 400, mensajesError);
        }
        next();
    }
    
]

export default validarCamposPersona;