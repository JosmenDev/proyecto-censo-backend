import Ocupacion from "../../models/person/Ocupacion.js";
import {respondWithError, respondWithServerError} from '../../helpers/errors.js';

const agregarRegistro = async (req, res) => {
    try {
        await Ocupacion.create(req.body);
        res.json({msg: 'Ocupación agregada correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarOcupaciones = await Ocupacion.findAll({where:{
            estado: 1
        }})
        res.json(listarOcupaciones);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const ocupacion = await Ocupacion.findByPk(id);
        if (!ocupacion) {
            return respondWithError(res, 404, 'Ocupación no encontrada');
        }
        res.json(ocupacion);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const ocupacion = await Ocupacion.findByPk(id);
        if (!ocupacion) {
            return respondWithError(res, 404, 'Ocupación no encontrada');
        }
        // Actualiza
        ocupacion.nombre = req.body.nombre || ocupacion.nombre;
        await ocupacion.save();
        res.json({msg: 'Ocupación actualizada correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const ocupacion = await Ocupacion.findByPk(id);
        if (!ocupacion) {
            return respondWithError(res, 404, 'Ocupación no encontrada');
        }
        ocupacion.estado = false;
        await ocupacion.save();
        res.json({msg: 'Ocupación eliminada correctamente'});
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