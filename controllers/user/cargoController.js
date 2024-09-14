import Cargo from "../../models/user/Cargo.js"
import { respondWithError, respondWithServerError } from "../../helpers/errors.js";

const agregarRegistro = async (req, res) => {
    try {
        await Cargo.create(req.body);
        res.json({msg: 'Cargo agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
}

const listarRegistros = async (req, res) => {
    try {
        const listarCargos = await Cargo.findAll({where:{
            estado: true
        }})
        res.json(listarCargos);
    } catch (error) {
        respondWithServerError(res, error);
    }
} 

const obtenerRegistro = async(req, res) => {
    const { id } = req.params;
    try {
        const cargo = await Cargo.findByPk(id);
        if (!cargo) {
            return respondWithError(res, 404, 'Cargo no encontrado');
        }
        res.json(cargo);
    } catch (error) {
        respondWithServerError(res, error);
    }

}

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const cargo = await Cargo.findByPk(id);
        if (!cargo) {
            return respondWithError(res, 404, 'Cargo no encontrado');
        }
        // Actualiza
        cargo.nombre = req.body.nombre || cargo.nombre;
        await cargo.save();
        res.json({msg: 'Cargo actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
}

const desactivarRegistro = async(req, res) => {
    const {id} = req.params;
    try {
        const cargo = await Cargo.findByPk(id);
        if (!cargo) {
            return respondWithError(res, 404, 'Cargo no encontrado');
        }
        cargo.estado = false;
        await cargo.save();
        res.json({msg: 'Cargo eliminado correctamente'});
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