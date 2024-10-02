import {respondWithError, respondWithServerError} from '../../helpers/errors.js';
import CargoComunidad from '../../models/person/cargoCuminadad.js';

const agregarRegistro = async (req, res) => {
    try {
        const nuevoCargoComunidad = await CargoComunidad.create(req.body);
        res.json(nuevoCargoComunidad);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarCargosComunidad = await CargoComunidad.findAll({where:{
            estado: true
        }})
        res.json(listarCargosComunidad);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const cargoComunidad = await CargoComunidad.findByPk(id);
        if (!cargoComunidad) {
            return respondWithError(res, 404, 'Cargo de comunidad no encontrado');
        }
        res.json(cargoComunidad);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const cargoComunidad = await CargoComunidad.findByPk(id);
        if (!cargoComunidad) {
            return respondWithError(res, 404, 'Cargo de comunidad no encontrado');
        }
        // Actualiza
        cargoComunidad.nombre = req.body.nombre || cargoComunidad.nombre;
        const cargoComunidadActualizado = await cargoComunidad.save();
        res.json(cargoComunidadActualizado);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const cargoComunidad = await CargoComunidad.findByPk(id);
        if (!cargoComunidad) {
            return respondWithError(res, 404, 'Cargo de comunidad no encontrado');
        }
        cargoComunidad.estado = false;
        await cargoComunidad.save();
        res.json({msg: ' Cargo de comunidad eliminado correctamente'});
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