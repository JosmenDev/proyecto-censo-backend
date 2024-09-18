import EquipoAsignado from "../../models/familyRecord/EquipoAsignado.js";
import Empleado from "../../models/user/Empleado.js";  
import Sector from "../../models/housingLocation/Sector.js";
import { respondWithError, respondWithServerError } from "../../helpers/errors.js";

const agregarRegistro = async (req, res) => {
    const { idempleado, idsector } = req.body;
    try {
        // Verificar que el empleado y el sector existen
        const sector = await Sector.findByPk(idsector);
        if (!sector) {
            return respondWithError(res, 404, 'Sector no encontrado');
        }
        const empleado = await Empleado.findByPk(idempleado);
        if (!empleado) {
            return respondWithError(res, 404, 'Empleado no encontrado');
        }

        // Crear el registro
        await EquipoAsignado.create(req.body);
        res.json({ msg: 'Empleado asignado al sector correctamente' });
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const registros = await EquipoAsignado.findAll({
            where: {
                estado: true
            },
            include: [
                { model: Empleado, as: 'Empleado' },
                { model: Sector, as: 'Sector' }
            ]
        });
        res.json(registros);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const equipoAsignado = await EquipoAsignado.findAll( {where: {idsector: id}}, {
            include: [
                { model: Empleado, as: 'Empleado' },
                { model: Sector, as: 'Sector' }
            ]
        });
        if (!equipoAsignado) {
            return respondWithError(res, 404, 'Registro no encontrado');
        }
        res.json(equipoAsignado);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const equipoAsignado = await EquipoAsignado.findByPk(id);
        if (!equipoAsignado) {
            return respondWithError(res, 404, 'Registro no encontrado');
        }
        equipoAsignado.estado = false;
        await equipoAsignado.save();
        res.json({ msg: 'Registro desactivado correctamente' });
    } catch (error) {
        respondWithServerError(res, error);
    }
};

export {
    agregarRegistro,
    listarRegistros,
    obtenerRegistro,
    desactivarRegistro
};
