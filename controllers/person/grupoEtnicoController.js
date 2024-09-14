import {respondWithError, respondWithServerError} from '../../helpers/errors.js';
import GrupoEtnico from "../../models/person/GrupoEtnico.js";

const agregarRegistro = async (req, res) => {
    const {nombre} = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        await GrupoEtnico.create(req.body);
        res.json({msg: 'Grupo étnico agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarGruposEtnicos = await GrupoEtnico.findAll({where:{
            estado: true
        }})
        res.json(listarGruposEtnicos);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const grupoEtnico = await GrupoEtnico.findByPk(id);
        if (!grupoEtnico) {
            return respondWithError(res, 404, 'Grupo étnico no encontrado');
        }
        res.json(grupoEtnico);
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
        const grupoEtnico = await GrupoEtnico.findByPk(id);
        if (!grupoEtnico) {
            return respondWithError(res, 404, 'Grupo étnico no encontrado');
        }
        // Actualiza
        grupoEtnico.nombre = req.body.nombre || grupoEtnico.nombre;
        await grupoEtnico.save();
        res.json({msg: 'Grupo étnico actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const grupoEtnico = await GrupoEtnico.findByPk(id);
        if (!grupoEtnico) {
            return respondWithError(res, 404, 'Grupo étnico no encontrado');
        }
        grupoEtnico.estado = false;
        await grupoEtnico.save();
        res.json({msg: 'Grupo étnico eliminado correctamente'});
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