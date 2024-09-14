import Distrito from "../../models/housingLocation/Distrito.js";
import Provincia from "../../models/housingLocation/Provincia.js";

const agregarRegistro = async (req, res) => {
    const { nombre, idprovincia } = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        if (!idprovincia) {
            return respondWithError(res, 400, 'El campo "provincia" es obligatorio');
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
            include: [{ model: Provincia, as: 'provincia' }]  // Incluir datos de la provincia relacionada
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
            include: [{ model: Provincia, as: 'provincia' }]  // Incluir la provincia
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
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        if (!idprovincia) {
            return respondWithError(res, 400, 'El campo "provincia" es obligatorio');
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
