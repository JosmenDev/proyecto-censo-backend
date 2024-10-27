import Cloracion from "../../models/houstingCharacteristics/Cloracion.js";
import {respondWithError, respondWithServerError} from '../../helpers/errors.js';

const agregarRegistro = async (req, res) => {
    try {
        const nuevaCloracion =  await Cloracion.create(req.body);
        res.json(nuevaCloracion);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarCloraciones = await Cloracion.findAll({where:{
            estado: true
        }})
        res.json(listarCloraciones);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const cloracion = await Cloracion.findByPk(id);
        if (!cloracion) {
            return respondWithError(res, 404, 'Cloración no encontrada');
        }
        res.json(cloracion);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const cloracion = await Cloracion.findByPk(id);
        if (!cloracion) {
            return respondWithError(res, 404, 'Cloración no encontrada');
        }
        // Actualiza
        cloracion.nombre = req.body.nombre || cloracion.nombre;
        const cloracionActualizado =  await cloracion.save();
        res.json(cloracionActualizado);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const cloracion = await Cloracion.findByPk(id);
        if (!cloracion) {
            return respondWithError(res, 404, 'Cloración no encontrada');
        }
        cloracion.estado = false;
        await cloracion.save();
        res.json({msg: 'Cloracion eliminada correctamente'});
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