import jwt from 'jsonwebtoken'
import Usuario from '../models/user/Usuario.js';
import { respondWithError, respondWithServerError } from '../helpers/errors.js';
import Rol from '../models/user/Rol.js';
import Empleado from '../models/user/Empleado.js';

const checkAuth = async (req, res, next ) => {
    let token = null;  // Inicializamos la variable `token` como null

    // req.headers -> permite capturar el token que se envia
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // si tiene  el token y es bearer
        try {
            // separo el token en dos valores y tomo el segundo valor
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded.id);
            // req.usuario crea sesion con el usuario
            req.usuario = await Usuario.findByPk(decoded.id, {
                attributes: { exclude: ['password', 'token', 'confirmado'] },
                include: [ { model: Empleado, as: 'empleado'}]
            });
            // .get() aseguras de que usuario sea un objeto plano, y no la instancia completa de Sequelize
            if (!req.usuario) {
                respondWithError(res, 404, 'Usuario no encontrado');
            }
            // una vez en sesion, le doy next para que ingrese al sistema
            return next();
        } catch (error) {
            return respondWithError(res, 401,  error);
        }
    }

    // si se queda vacio o no hubo un token valido
    if (!token) {
        return respondWithError(res, 403, 'Token no válido o inexistente');
    }
}

const hasRoles = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.usuario.idrol)) {
            return next();
        }
        return respondWithError(res, 403, 'No tienes acceso para esta ruta');
    }
}

export {
    hasRoles,
    checkAuth
};