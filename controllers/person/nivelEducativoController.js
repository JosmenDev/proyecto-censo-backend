import {respondWithError, respondWithServerError} from '../../helpers/errors.js';
import NivelEducativo from "../../models/person/NivelEducativo.js";

const agregarRegistro = async (req, res) => {
    const {nombre} = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        await NivelEducativo.create(req.body);
        res.json({msg: 'Nivel educativo agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarNivelesEducativos = await NivelEducativo.findAll({where:{
            estado: true
        }})
        res.json(listarNivelesEducativos);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const nivelEducativo = await NivelEducativo.findByPk(id);
        if (!nivelEducativo) {
            return respondWithError(res, 404, 'Nivel educativo no encontrado');
        }
        res.json(nivelEducativo);
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
        const nivelEducativo = await NivelEducativo.findByPk(id);
        if (!nivelEducativo) {
            return respondWithError(res, 404, 'Nivel educativo no encontrado');
        }
        // Actualiza
        nivelEducativo.nombre = req.body.nombre || nivelEducativo.nombre;
        await nivelEducativo.save();
        res.json({msg: 'Nivel educativo actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const nivelEducativo = await NivelEducativo.findByPk(id);
        if (!nivelEducativo) {
            return respondWithError(res, 404, 'Nivel educativo no encontrado');
        }
        nivelEducativo.estado = false;
        await nivelEducativo.save();
        res.json({msg: 'Nivel educativo eliminado correctamente'});
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