import Sector from "../../models/housingLocation/Sector.js";
import Distrito from "../../models/housingLocation/Distrito.js";
import { respondWithError, respondWithServerError } from "../../helpers/errors.js";
import Provincia from "../../models/housingLocation/Provincia.js";
import Departamento from "../../models/housingLocation/Departamento.js";

const agregarRegistro = async (req, res) => {
    const { iddistrito } = req.body;
    try {
        const distrito = await Distrito.findByPk(iddistrito);
        if (!distrito) {
            return respondWithError(res, 404, 'Distrito no encontrado');
        }
        await Sector.create(req.body);
        res.json({ msg: 'Sector agregado correctamente' });
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarSectores = await Sector.findAll({
            where: { estado: true },
            include: [{ model: Distrito, as: 'Distrito',
                include: [{ model: Provincia, as: 'Provincia',
                    include: [{ model: Departamento, as: 'Departamento'}]
                }] 
            }]
        });
        res.json(listarSectores);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const sector = await Sector.findByPk(id, {
            include: [{ model: Distrito, as: 'Distrito',
                include: [{ model: Provincia, as: 'Provincia',
                    include: [{ model: Departamento, as: 'Departamento'}]
                }] 
            }]
        });
        if (!sector) {
            return respondWithError(res, 404, 'Sector no encontrado');
        }
        res.json(sector);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    const { nombre, iddistrito } = req.body;
    try {

        const sector = await Sector.findByPk(id);
        if (!sector) {
            return respondWithError(res, 404, 'Sector no encontrado');
        }
        
        const distrito = await Distrito.findByPk(iddistrito);
        if (!distrito) {
            return respondWithError(res, 404, 'Distrito no encontrado');
        }

        // Actualiza
        sector.nombre = nombre;
        sector.iddistrito = iddistrito;
        await sector.save();
        res.json({ msg: 'Sector actualizado correctamente' });
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const sector = await Sector.findByPk(id);
        if (!sector) {
            return respondWithError(res, 404, 'Sector no encontrado');
        }
        sector.estado = false;
        await sector.save();
        res.json({ msg: 'Sector eliminado correctamente' });
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
