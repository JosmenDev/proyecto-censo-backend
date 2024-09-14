import CentroPoblado from "../../models/housingLocation/CentroPoblado.js";
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
        
        const distrito = await Distrito.findByPk(iddistrito);
        if (!distrito) {
            return respondWithError(res, 404, 'Distrito no encontrado');
        }

        await CentroPoblado.create(req.body);
        res.json({ msg: 'Centro Poblado agregado correctamente' });
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarCentrosPoblados = await CentroPoblado.findAll({
            where: { estado: true },
            include: [{ model: Distrito, as: 'distrito' }]  // Incluir datos del distrito relacionado
        });
        res.json(listarCentrosPoblados);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const centroPoblado = await CentroPoblado.findByPk(id, {
            include: [{ model: Distrito, as: 'distrito' }]  // Incluir el distrito
        });
        if (!centroPoblado) {
            return respondWithError(res, 404, 'Centro Poblado no encontrado');
        }
        res.json(centroPoblado);
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

        const centroPoblado = await CentroPoblado.findByPk(id);
        if (!centroPoblado) {
            return respondWithError(res, 404, 'Centro Poblado no encontrado');
        }

        const distrito = await Distrito.findByPk(iddistrito);
        if (!distrito) {
            return respondWithError(res, 404, 'Distrito no encontrado');
        }

        // Actualiza
        centroPoblado.nombre = nombre;
        centroPoblado.iddistrito = iddistrito;
        await centroPoblado.save();
        res.json({ msg: 'Centro Poblado actualizado correctamente' });
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const centroPoblado = await CentroPoblado.findByPk(id);
        if (!centroPoblado) {
            return respondWithError(res, 404, 'Centro Poblado no encontrado');
        }
        centroPoblado.estado = false;
        await centroPoblado.save();
        res.json({ msg: 'Centro Poblado eliminado correctamente' });
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
