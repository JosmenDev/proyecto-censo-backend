import jwt from 'jsonwebtoken'
import Usuario from '../models/user/Usuario.js';
import { respondWithError, respondWithServerError } from '../helpers/errors.js';
import Rol from '../models/user/Rol.js';

const checkAuth = async (req, res, next ) => {
    let token = null;  // Inicializamos la variable `token` como null

    // req.headers -> permite capturar el token que se envia
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // si tiene  el token y es bearer
        try {
            // separo el token en dos valores y tomo el segundo valor
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // req.usuario crea sesion con el usuario
            req.usuario = await Usuario.findByPk(decoded.id, {
                attributes: { exclude: ['password', 'token', 'confirmado'] }
            });
            // .get() aseguras de que usuario sea un objeto plano, y no la instancia completa de Sequelize
            if (!req.usuario) {
                respondWithError(res, 404, 'Usuario no encontrado');
            }
            // una vez en sesion, le doy next para que ingrese al sistema
            return next();
        } catch (error) {
            respondWithServerError(res, error);
        }
    }

    // si se queda vacio o no hubo un token valido
    if (!token) {
        respondWithError(res, 403, 'Token no válido o inexistente');
    }
}

const isRegister = async(req, res, rext) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id);
        const rol = await Rol.findByPk(req.usuario.idrol);
        // Validar si es registrador
        if (rol.id === "REGISTER") {
            return next();
        }
        return respondWithError(res, 403, 'Requiere el rol de registrador');
    } catch (error) {
        respondWithServerError(res, error); 
    }
}

const isAdmin = async(req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id);
        const rol = await Rol.findByPk(req.usuario.idrol);
        // Validar si es administrador
        console.log(rol.id);
        if (rol.id === 'ADMIN') {
            return next();
        }
        return respondWithError(res, 403, 'Requiere el rol de administrador');
    } catch (error) {
        respondWithServerError(res, error);
    }
}

export {
    checkAuth,
    isRegister,
    isAdmin
};