import Religion from "../../models/person/Religion.js";
import {respondWithError, respondWithServerError} from '../../helpers/errors.js';

const agregarRegistro = async (req, res) => {
    const {nombre} = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        await Religion.create(req.body);
        res.json({msg: 'Religión agregada correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarReligiones = await Religion.findAll({where:{
            estado: 1
        }})
        res.json(listarReligiones);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const religion = await Religion.findByPk(id);
        if (!religion) {
            return respondWithError(res, 404, 'Religión no encontrada');
        }
        res.json(religion);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        const religion = await Religion.findByPk(id);
        if (!religion) {
            return respondWithError(res, 404, 'Religión no encontrada');
        }
        // Actualiza
        religion.nombre = req.body.nombre || religion.nombre;
        await religion.save();
        res.json({msg: 'Religión actualizada correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const religion = await Religion.findByPk(id);
        if (!religion) {
            return respondWithError(res, 404, 'Religión no encontrada');
        }
        religion.estado = false;
        await religion.save();
        res.json({msg: 'Religión eliminada correctamente'});
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