import { respondWithError, respondWithServerError } from "../../helpers/errors.js";
import Rol from "../../models/user/Rol.js"

const agregarRegistro = async (req, res) => {
    const { id } = req.body;
    try {
        const rolEncontrado = await Rol.findByPk(id);
        if (rolEncontrado) {
            return respondWithError(res, 409, 'El rol ya está registrado');
        }
        await Rol.create(req.body);
        res.json({msg: 'Rol agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
}

const listarRegistros = async (req, res) => {

    try {
        const listarRoles = await Rol.findAll({ where: { estado: 1}});
        res.json(listarRoles);
    } catch (error) {
        respondWithServerError(res, error);
    }
}

const obtenerRegistro = async (req, res) => {

    const { id } = req.params;
    try {
        const rol = await Rol.findByPk(id);
        if (!rol) {
            return respondWithError(res, 404, 'Rol no encontrado');
        }
        res.json(rol);
    } catch (error) {
        respondWithServerError(res, error);
    }
    

}

const actualizarRegistro = async (req, res) => {

    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const rol = await Rol.findByPk(id);
        if (!rol) {
            return respondWithError(res, 404, 'Rol no encontrado');
        }
        
        const rolNombre = await Rol.findOne({ where: {nombre}});
        if (rolNombre) {
            return respondWithError(res, 409, 'Rol ya está registrado');
        }

        rol.nombre = nombre;
        await rol.save();
        res.json({ msg: 'Rol actualizado correctamente'});

    } catch (error) {
        respondWithServerError(res, error);
    }
}

const desactivarRegistro = async (req, res) => {

    const { id } = req.params;
    try {
        const rol = await Rol.findByPk(id);
        if (!rol) {
            return respondWithError(res, 404, 'Rol no encontrado');
        }

        rol.estado = false;
        await rol.save();
        res.json({ msg: 'Rol eliminado correctamente'});

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