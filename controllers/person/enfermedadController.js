import Enfermedad from "../../models/person/Enfermedad.js";

const agregarRegistro = async (req, res) => {
    const { nombre } = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        await Enfermedad.create(req.body);
        res.json({msg: 'Enfermedad agregada correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarEnfermedades = await Enfermedad.findAll({where:{
            estado: true
        }})
        res.json(listarEnfermedades);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const enfermedad = await Enfermedad.findByPk(id);
        if (!enfermedad) {
            return respondWithError(res, 404, 'Enfermedad no encontrada');
        }
        res.json(enfermedad);
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
        const enfermedad = await Enfermedad.findByPk(id);
        if (!enfermedad) {
            return respondWithError(res, 404, 'Enfermedad no encontrada');
        }
        // Actualiza
        enfermedad.nombre = req.body.nombre || enfermedad.nombre;
        await enfermedad.save();
        res.json({msg: 'Enfermedad actualizada correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const enfermedad = await Enfermedad.findByPk(id);
        if (!enfermedad) {
            return respondWithError(res, 404, 'Enfermedad no encontrada');
        }
        enfermedad.estado = false;
        await enfermedad.save();
        res.json({msg: 'Enfermedad eliminada correctamente'});
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