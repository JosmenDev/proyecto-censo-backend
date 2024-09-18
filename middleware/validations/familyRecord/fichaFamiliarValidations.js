import { body, validationResult } from 'express-validator';
import { respondWithError } from '../../../helpers/errors.js';

const validarCamposFichaFamiliar = [
    body('fecha_ficha')
        .notEmpty()
        .withMessage('El campo "Fecha de ficha" es obligatorio')
        .bail()
        .isDate()
        .withMessage('El campo "Fecha de ficha" es una dato de tipo fecha')
        .trim(),
    body('resultado_aplicacion')
        .notEmpty()
        .withMessage('El campo "Resultado de Aplicación" es obligatorio')
        .trim(),
    body('apellidos_familia')
        .notEmpty()
        .withMessage('El campo "Apellidos de Familia es obligatorio"')
        .trim(),
    // body('idempleado')
    //     .notEmpty()
    //     .withMessage('El campo "Empleado" es obligatorio'),
    body('localizacion.ubicacion_geografica')
        .notEmpty()
        .withMessage('El campo "Ubicación geográfica" es obligatorio'),
    body('localizacion.idsector')
        .notEmpty()
        .withMessage('El campo "Sector" es obligatorio'),
    body('localizacion.longitud')
        .notEmpty()
        .withMessage('El campo "Longitud" es obligatorio')
        .bail()
        .isNumeric()
        .withMessage('El campo "Longitud" es un valor numérico'),
    body('localizacion.latitud')
        .notEmpty()
        .withMessage('El campo "Latitud" es obligatorio')
        .bail()
        .isNumeric()
        .withMessage('El campo "Latitud" es un valor numérico'),
    body('localizacion.direccion')
        .notEmpty()
        .withMessage('El campo "Dirección" es obligatorio')
        .trim(),
    body('localizacion.referencia')
        .notEmpty()
        .withMessage('El campo "Referencia" es obligatorio')
        .trim(),
    body('localizacion.nro_piso')
        .notEmpty()
        .withMessage('El campo "Numéro de Piso" es obligatorio')
        .bail()
        .isInt()
        .withMessage('El campo "Numéro de Piso" es numérico')
        .trim(),
        body('localizacion.nro_familias')
        .notEmpty()
        .withMessage('El campo "Numéro de Familias" es obligatorio')
        .bail()
        .isInt()
        .withMessage('El campo "Numéro de Familias" es numérico')
        .trim(),
    body('localizacion.nro_vivienda')
        .notEmpty()
        .withMessage('El campo "Numérico de Vivienda" es obligatorio')
        .bail()
        .isInt()
        .withMessage('El campo "Numérico de Vivienda" es numérico')
        .trim(),
    body('caracteristicas.idmaterial_vivienda')
        .notEmpty()
        .withMessage('El campo "Material de vivienda" es obligatorio')
        .trim(),
        
    body('caracteristicas.idabastecimiento_agua')
        .notEmpty()
        .withMessage('El campo "Abastecimiento de agua" es obligatorio')
        .trim(),
    body('caracteristicas.idservicio_higienico')
        .notEmpty()
        .withMessage('El campo "Servicio higiénico" es obligatorio')
        .trim(),
    body('caracteristicas.idcloracion')
        .notEmpty()
        .withMessage('El campo "Cloración" es obligatorio')
        .trim(),
    body('caracteristicas.iddisposicion_basura')
        .notEmpty()
        .withMessage('El campo "Disposición de basura" es obligatorio')
        .trim(),
    body('caracteristicas.tenencia_canes')
        .notEmpty()
        .withMessage('El campo "Tenencia de canes" es obligatorio'),
    body('caracteristicas.almacena_agua_vivienda')
        .notEmpty()
        .withMessage('El campo "Almacena agua en la vivienda" es obligatorio'),
    body('medidas_proteccion')
        .isArray()
        .withMessage('Se debe hacer el ingreso de Medidas de protección')
        .bail()
        .custom((arr) => {
            if (arr.length === 0) {
                throw new Error('El arreglo de medidas de protección no puede estar vacío');
            }
            return true; // La validación pasa si tiene al menos un elemento
        }),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            const mensajesError = errores.array().map(err => err.msg);
            return respondWithError(res, 400, mensajesError);
        }
        next();
    }
];

export default validarCamposFichaFamiliar;