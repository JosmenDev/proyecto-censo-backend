import Cloracion from "../../models/houstingCharacteristics/Cloracion.js";

const agregarRegistro = async (req, res) => {
    const { nombre } = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        await Cloracion.create(req.body);
        res.json({msg: 'Cloración agregada correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarCloraciones = await Cloracion.findAll({where:{
            estado: true
        }})
        res.json(listarCloraciones);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const cloracion = await Cloracion.findByPk(id);
        if (!cloracion) {
            return respondWithError(res, 404, 'Cloración no encontrada');
        }
        res.json(cloracion);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        const cloracion = await Cloracion.findByPk(id);
        if (!cloracion) {
            return respondWithError(res, 404, 'Cloración no encontrada');
        }
        // Actualiza
        cloracion.nombre = req.body.nombre || cloracion.nombre;
        await cloracion.save();
        res.json({msg: 'Cloración actualizada correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const cloracion = await Cloracion.findByPk(id);
        if (!cloracion) {
            return respondWithError(res, 404, 'Cloración no encontrada');
        }
        cloracion.estado = false;
        await cloracion.save();
        res.json({msg: 'Cloracion eliminada correctamente'});
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