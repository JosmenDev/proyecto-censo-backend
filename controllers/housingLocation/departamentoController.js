import Departamento from "../../models/housingLocation/Departamento.js";
import {respondWithError, respondWithServerError} from '../../helpers/errors.js';

const agregarRegistro = async (req, res) => {
    try {
        await Departamento.create(req.body);
        res.json({msg: 'Departamento agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarDepartamentos = await Departamento.findAll({
            where: {
                estado: true
            }
        });
        res.json(listarDepartamentos);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const departamento = await Departamento.findByPk(id);
        if (!departamento) {
            return respondWithError(res, 404, 'Departamento no encontrado');
        }
        res.json(departamento);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const departamento = await Departamento.findByPk(id);
        if (!departamento) {
            return respondWithError(res, 404, 'Departamento no encontrado');
        }
        departamento.nombre = req.body.nombre || departamento.nombre;
        await departamento.save();
        res.json({msg: 'Departamento actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const departamento = await Departamento.findByPk(id);
        if (!departamento) {
            return respondWithError(res, 404, 'Departamento no encontrado');
        }
        departamento.estado = false;
        await departamento.save();
        res.json({msg: 'Departamento eliminado correctamente'});
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
