import { respondWithError, respondWithServerError } from "../../helpers/errors.js";
import MedidaProteccion from "../../models/houstingCharacteristics/MedidaProteccion.js";

const agregarRegistro = async (req, res) => {
    try {
        const nuevaMedidaProteccion = await MedidaProteccion.create(req.body);
        res.json(nuevaMedidaProteccion);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarMedidasProteccion = await MedidaProteccion.findAll({where:{
            estado: true
        }})
        res.json(listarMedidasProteccion);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const medidaProteccion = await MedidaProteccion.findByPk(id);
        if (!medidaProteccion) {
            return respondWithError(res, 404, 'Medida de protección no encontrada');
        }
        res.json(medidaProteccion);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const medidaProteccion = await MedidaProteccion.findByPk(id);
        if (!medidaProteccion) {
            return respondWithError(res, 404, 'Medida de protección no encontrada');
        }
        // Actualiza
        medidaProteccion.nombre = req.body.nombre || medidaProteccion.nombre;
        const medidaProteccionActualizada = await medidaProteccion.save();
        res.json(medidaProteccionActualizada);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const medidaProteccion = await MedidaProteccion.findByPk(id);
        if (!medidaProteccion) {
            return respondWithError(res, 404, 'Medida de protección no encontrada');
        }
        medidaProteccion.estado = false;
        await medidaProteccion.save();
        res.json({msg: 'Medida de protección eliminada correctamente'});
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