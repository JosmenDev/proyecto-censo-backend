import { respondWithError, respondWithServerError } from "../../helpers/errors.js";
import ServicioHigienico from "../../models/houstingCharacteristics/ServicioHigienico.js";

const agregarRegistro = async (req, res) => {
    try {
        const nuevoServicioHigienico = await ServicioHigienico.create(req.body);
        res.json(nuevoServicioHigienico);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarServiciosHigienicos = await ServicioHigienico.findAll({where:{
            estado: true
        }})
        res.json(listarServiciosHigienicos);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const servicioHigienico = await ServicioHigienico.findByPk(id);
        if (!servicioHigienico) {
            return respondWithError(res, 404, 'Servicio higiénico no encontrado');
        }
        res.json(servicioHigienico);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const servicioHigienico = await ServicioHigienico.findByPk(id);
        if (!servicioHigienico) {
            return respondWithError(res, 404, 'Servicio higiénico no encontrado');
        }
        // Actualiza
        servicioHigienico.nombre = req.body.nombre || servicioHigienico.nombre;
        const servicioHigienicoActualizado = await servicioHigienico.save();
        res.json(servicioHigienicoActualizado);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const servicioHigienico = await ServicioHigienico.findByPk(id);
        if (!servicioHigienico) {
            return respondWithError(res, 404, 'Servicio higiénico no encontrado');
        }
        servicioHigienico.estado = false;
        await servicioHigienico.save();
        res.json({msg: 'Servicio higiénico eliminado correctamente'});
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