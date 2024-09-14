
import { respondWithError, respondWithServerError } from "../../helpers/errors.js";
import Empleado from "../../models/user/Empleado.js";
import Usuario from "../../models/user/Usuario.js";

const agregarRegistro = async (req, res) => {
    const {username, password} = req.body;
    try {
        if (!username) {
            return respondWithError(res, 400, 'El campo "Nombre de Usuario" es obligatorio');
        }
        if (!password) {
            return respondWithError(res, 400, 'El campo "Contraseña" es obligatorio');
        }
        await Usuario.create(req.body);
        res.json({msg: 'Usuario registrado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
    
}

const listarRegistros = async (req, res) => {

    try {
        const listadoUsuarios = await Usuario.findAll({where: {estado: true},
        include: {model: Empleado, as: 'Empleado', attributes: ['dni', 'nombre', 'apellidos']}});
        res.json({ msg: listadoUsuarios});
    } catch (error) {
        respondWithServerError(res, error);
    }
}

const obtenerRegistro = async (req, res) => {

    const {id} = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return respondWithError(res, 404, 'Usuario no encontrado');
        }
        res.json(usuario);
    } catch (error) {
        respondWithServerError(res, error);
    }
}

const actualizarRegistro = async (req, res) => {

    const {id} = req.params;
    const {username, password} = req.body;
    try {
        if (!username) {
            return respondWithError(res, 400, 'El campo "Nombre de Usuario" es obligatorio');
        }
        if (!password) {
            return respondWithError(res, 400, 'El campo "Contraseña" es obligatorio');
        }
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return respondWithError(res, 404, 'Usuario no encontrado');
        }

        usuario.username = username || usuario.username;
        usuario.password = password || usuario.password;
        await usuario.save();
        res.json({msg: 'Usuario actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }

}

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return respondWithError(res, 404, 'Usuario no encontrado');
        }

        usuario.estado = false;
        await usuario.save();
        res.json({msg: 'Usuario eliminado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
}

export {
    agregarRegistro,
    listarRegistros,
    obtenerRegistro,
    actualizarRegistro,
    desactivarRegistro
}