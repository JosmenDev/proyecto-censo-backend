import AccionEmergencia from "../../models/person/AccionEmergencia.js";
import { respondWithError, respondWithServerError } from "../../helpers/errors.js";

const agregarRegistro = async (req, res) => {
    try {
        const nuevaAccionEmergencia = await AccionEmergencia.create(req.body);
        res.json(nuevaAccionEmergencia);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarAccionesEmergencia = await AccionEmergencia.findAll({where:{
            estado: 1
        }})
        res.json(listarAccionesEmergencia);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const accionEmergencia = await AccionEmergencia.findByPk(id);
        if (!accionEmergencia) {
            return respondWithError(res, 404, 'Acción de emergencia no encontrada');
        }
        res.json(accionEmergencia);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const accionEmergencia = await AccionEmergencia.findByPk(id);
        if (!accionEmergencia) {
            return respondWithError(res, 404, 'Acción de emergencia no encontrada');
        }
        // Actualiza
        accionEmergencia.nombre = req.body.nombre || accionEmergencia.nombre;
        const accionEmergenciaActualizada = await accionEmergencia.save();
        res.json(accionEmergenciaActualizada);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const accionEmergencia = await AccionEmergencia.findByPk(id);
        if (!accionEmergencia) {
            return respondWithError(res, 404, 'Acción de emergencia no encontrada');
        }
        accionEmergencia.estado = false;
        await accionEmergencia.save();
        res.json({msg: 'Acción de emergencia eliminada correctamente'});
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