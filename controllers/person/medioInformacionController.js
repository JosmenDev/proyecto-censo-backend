import {respondWithError, respondWithServerError} from '../../helpers/errors.js';
import MedioInformacion from "../../models/person/MedioInformacion.js";

const agregarRegistro = async (req, res) => {
    const {nombre} = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        await MedioInformacion.create(req.body);
        res.json({msg: 'Medio de información agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarMediosInformacion = await MedioInformacion.findAll({where:{
            estado: true
        }})
        res.json(listarMediosInformacion);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const medioInformacion = await MedioInformacion.findByPk(id);
        if (!medioInformacion) {
            return respondWithError(res, 404, 'Medio de información no encontrado');
        }
        res.json(medioInformacion);
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
        const medioInformacion = await MedioInformacion.findByPk(id);
        if (!medioInformacion) {
            return respondWithError(res, 404, 'Medio de información no encontrado');
        }
        // Actualiza
        medioInformacion.nombre = req.body.nombre || medioInformacion.nombre;
        await medioInformacion.save();
        res.json({msg: 'Medio de información actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const medioInformacion = await MedioInformacion.findByPk(id);
        if (!medioInformacion) {
            return respondWithError(res, 404, 'Medio de información no encontrado');
        }
        medioInformacion.estado = false;
        await medioInformacion.save();
        res.json({msg: 'Medio de informacion eliminado correctamente'});
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