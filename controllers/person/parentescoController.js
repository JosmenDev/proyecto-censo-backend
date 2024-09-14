import {respondWithError, respondWithServerError} from '../../helpers/errors.js';
import Parentesco from "../../models/person/Parentesco.js";

const agregarRegistro = async (req, res) => {
    try {
        await Parentesco.create(req.body);
        res.json({msg: 'Parentesco agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarParentescos = await Parentesco.findAll({where:{
            estado: true
        }})
        res.json(listarParentescos);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const parentesco = await Parentesco.findByPk(id);
        if (!parentesco) {
            return respondWithError(res, 404, 'Parentesco no encontrado');
        }
        res.json(parentesco);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const parentesco = await Parentesco.findByPk(id);
        if (!parentesco) {
            return respondWithError(res, 404, 'Parentesco no encontrado');
        }
        // Actualiza
        parentesco.nombre = req.body.nombre || parentesco.nombre;
        await parentesco.save();
        res.json({msg: 'Parentesco actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const parentesco = await Parentesco.findByPk(id);
        if (!parentesco) {
            return respondWithError(res, 404, 'Parentesco no encontrado');
        }
        parentesco.estado = false;
        await parentesco.save();
        res.json({msg: 'Parentesco eliminado correctamente'});
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