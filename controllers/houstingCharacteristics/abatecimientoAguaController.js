import AbastecimientoAgua from "../../models/houstingCharacteristics/AbastecimientoAgua.js";
import {respondWithError, respondWithServerError} from '../../helpers/errors.js';

const agregarRegistro = async (req, res) => {
    try {
        await AbastecimientoAgua.create(req.body);
        res.json({msg: 'Abastecimiento de agua agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarAbastecimientosAgua = await AbastecimientoAgua.findAll({where:{
            estado: true
        }})
        res.json(listarAbastecimientosAgua);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const abastecimientoAgua = await AbastecimientoAgua.findByPk(id);
        if (!abastecimientoAgua) {
            return respondWithError(res, 404, 'Abastecimiento de agua no encontrada');
        }
        res.json(abastecimientoAgua);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const abastecimientoAgua = await AbastecimientoAgua.findByPk(id);
        if (!abastecimientoAgua) {
            return respondWithError(res, 404, 'Abastecimiento de agua no encontrado');
        }
        // Actualiza
        abastecimientoAgua.nombre = req.body.nombre || abastecimientoAgua.nombre;
        await abastecimientoAgua.save();
        res.json({msg: 'Abastecimiento de agua actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const abastecimientoAgua = await AbastecimientoAgua.findByPk(id);
        if (!abastecimientoAgua) {
            return respondWithError(res, 404, 'Abastecimiento de agua no encontrado');
        }
        abastecimientoAgua.estado = false;
        await abastecimientoAgua.save();
        res.json({msg: 'Abastecimiento de agua eliminado correctamente'});
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