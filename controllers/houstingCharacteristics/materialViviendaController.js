import MaterialVivienda from "../../models/houstingCharacteristics/MaterialVivienda.js";
import {respondWithError, respondWithServerError} from '../../helpers/errors.js';

const agregarRegistro = async (req, res) => {
    try {
        await MaterialVivienda.create(req.body);
        res.json({msg: 'Material de vivienda agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarMaterialesVivienda = await MaterialVivienda.findAll({where:{
            estado: 1
        }})
        res.json(listarMaterialesVivienda);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const materialVivienda = await MaterialVivienda.findByPk(id);
        if (!materialVivienda) {
            return respondWithError(res, 404, 'Material de vivienda no encontrada');
        }
        res.json(materialVivienda);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const materialVivienda = await MaterialVivienda.findByPk(id);
        if (!materialVivienda) {
            return respondWithError(res, 404, 'Material de vivienda no encontrado');
        }
        // Actualiza
        materialVivienda.nombre = req.body.nombre || materialVivienda.nombre;
        await materialVivienda.save();
        res.json({msg: 'Material de vivienda actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const materialVivienda = await MaterialVivienda.findByPk(id);
        if (!materialVivienda) {
            return respondWithError(res, 404, 'Material de vivienda no encontrado');
        }
        materialVivienda.estado = false;
        await materialVivienda.save();
        res.json({msg: 'Material de vivienda eliminado correctamente'});
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