import SeguroSalud from "../../models/person/SeguroSalud.js";
import {respondWithError, respondWithServerError} from '../../helpers/errors.js';

const agregarRegistro = async (req, res) => {
    try {
        await SeguroSalud.create(req.body);
        res.json({msg: 'Seguro de salud agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarSegurosSalud = await SeguroSalud.findAll({where:{
            estado: true
        }})
        res.json(listarSegurosSalud);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const seguroSalud = await SeguroSalud.findByPk(id);
        if (!seguroSalud) {
            return respondWithError(res, 404, 'Seguro de salud no encontrado');
        }
        res.json(seguroSalud);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const seguroSalud = await SeguroSalud.findByPk(id);
        if (!seguroSalud) {
            return respondWithError(res, 404, 'Seguro de Salud no encontrado');
        }
        // Actualiza
        seguroSalud.nombre = req.body.nombre || seguroSalud.nombre;
        await seguroSalud.save();
        res.json({msg: 'Seguro de salud actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const seguroSalud = await SeguroSalud.findByPk(id);
        if (!seguroSalud) {
            return respondWithError(res, 404, 'Seguro de salud no encontrado');
        }
        seguroSalud.estado = false;
        await seguroSalud.save();
        res.json({msg: 'Seguro de salud eliminado correctamente'});
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