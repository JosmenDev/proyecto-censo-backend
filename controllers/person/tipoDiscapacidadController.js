import {respondWithError, respondWithServerError} from '../../helpers/errors.js';
import TipoDiscapacidad from "../../models/person/TipoDiscapacidad.js";

const agregarRegistro = async (req, res) => {
    try {
        const nuevoTipoDiscapacidad = await TipoDiscapacidad.create(req.body);
        res.json(nuevoTipoDiscapacidad);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarTiposDiscapacidad = await TipoDiscapacidad.findAll({where:{
            estado: 1
        }})
        res.json(listarTiposDiscapacidad);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoDiscapacidad = await TipoDiscapacidad.findByPk(id);
        if (!tipoDiscapacidad) {
            return respondWithError(res, 404, 'Tipo de discapacidad no encontrado');
        }
        res.json(tipoDiscapacidad);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoDiscapacidad = await TipoDiscapacidad.findByPk(id);
        if (!tipoDiscapacidad) {
            return respondWithError(res, 404, 'Tipo de discapacidad no encontrado');
        }
        // Actualiza
        tipoDiscapacidad.nombre = req.body.nombre || tipoDiscapacidad.nombre;
        const tipoDiscapacidadActualizada = await tipoDiscapacidad.save();
        res.json(tipoDiscapacidadActualizada);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const tipoDiscapacidad = await TipoDiscapacidad.findByPk(id);
        if (!tipoDiscapacidad) {
            return respondWithError(res, 404, 'Tipo de discapacidad no encontrado');
        }
        tipoDiscapacidad.estado = false;
        await tipoDiscapacidad.save();
        res.json({msg: 'Tipo de discapacidad eliminado correctamente'});
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
};