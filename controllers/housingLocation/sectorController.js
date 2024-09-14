import Sector from "../../models/housingLocation/Sector.js";
import Distrito from "../../models/housingLocation/Distrito.js";

const agregarRegistro = async (req, res) => {
    const { nombre, iddistrito } = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        if (!iddistrito) {
            return respondWithError(res, 400, 'El campo "iddistrito" es obligatorio');
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
            include: [{ model: Distrito, as: 'distrito' }]  // Incluir datos del distrito relacionado
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
            include: [{ model: Distrito, as: 'distrito' }]  // Incluir el distrito
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
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        if (!iddistrito) {
            return respondWithError(res, 400, 'El campo "iddistrito" es obligatorio');
        }

        const sector = await Sector.findByPk(id);
        if (!sector) {
            return respondWithError(res, 404, 'Sector no encontrado');
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