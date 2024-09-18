import Distrito from "../../models/housingLocation/Distrito.js";
import Provincia from "../../models/housingLocation/Provincia.js";
import { respondWithError, respondWithServerError } from "../../helpers/errors.js";
import Departamento from "../../models/housingLocation/Departamento.js";

const agregarRegistro = async (req, res) => {
    const { idprovincia } = req.body;
    try {
        const provincia = await Provincia.findByPk(idprovincia);
        if (!provincia) {
            return respondWithError(res, 404, 'Provincia no encontrada');
        }
        await Distrito.create(req.body);
        res.json({ msg: 'Distrito agregado correctamente' });
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarDistritos = await Distrito.findAll({
            where: { estado: true },
            include: [{ model: Provincia, as: 'Provincia' ,
                include: [{model: Departamento, as: 'Departamento'}]
            }]  // Incluir datos de la provincia relacionada
        });
        res.json(listarDistritos);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const distrito = await Distrito.findByPk(id, {
            include: [{ model: Provincia, as: 'Provincia',
                include: [{model: Departamento, as: 'Departamento'}]
             }]  // Incluir la provincia
        });
        if (!distrito) {
            return respondWithError(res, 404, 'Distrito no encontrado');
        }
        res.json(distrito);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    const { nombre, idprovincia } = req.body;
    try {
        const provincia = await Provincia.findByPk(idprovincia);
        if (!provincia) {
            return respondWithError(res, 404, 'Provincia no encontrada');
        }
        const distrito = await Distrito.findByPk(id);
        if (!distrito) {
            return respondWithError(res, 404, 'Distrito no encontrado');
        }
        distrito.nombre = nombre;
        distrito.idprovincia = idprovincia;
        await distrito.save();
        res.json({ msg: 'Distrito actualizado correctamente' });
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const distrito = await Distrito.findByPk(id);
        if (!distrito) {
            return respondWithError(res, 404, 'Distrito no encontrado');
        }
        distrito.estado = false;
        await distrito.save();
        res.json({ msg: 'Distrito eliminado correctamente' });
    } catch (error) {
        respondWithServerError(res, error);
    }
};

export {
    agregarRegistro,
    listarRegistros,
    obtenerRegistro,
    actualizarRegistro,
    desactivarRegistro
};
