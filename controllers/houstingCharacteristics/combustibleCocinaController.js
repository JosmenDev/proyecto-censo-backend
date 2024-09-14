import CombustibleCocina from "../../models/houstingCharacteristics/CombustibleCocina.js";

const agregarRegistro = async (req, res) => {
    const { nombre } = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        await CombustibleCocina.create(req.body);
        res.json({msg: 'Combustible de cocina agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarCombustiblesCocina = await CombustibleCocina.findAll({where:{
            estado: true
        }})
        res.json(listarCombustiblesCocina);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const combustibleCocina = await CombustibleCocina.findByPk(id);
        if (!combustibleCocina) {
            return respondWithError(res, 404, 'Combustible de cocina no encontrado');
        }
        res.json(combustibleCocina);
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
        const combustibleCocina = await CombustibleCocina.findByPk(id);
        if (!combustibleCocina) {
            return respondWithError(res, 404, 'Combustible de cocina no encontrado');
        }
        // Actualiza
        combustibleCocina.nombre = req.body.nombre || combustibleCocina.nombre;
        await combustibleCocina.save();
        res.json({msg: 'Combustible de cocina actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const combustibleCocina = await CombustibleCocina.findByPk(id);
        if (!combustibleCocina) {
            return respondWithError(res, 404, 'Combustible de cocina no encontrado');
        }
        combustibleCocina.estado = false;
        await combustibleCocina.save();
        res.json({msg: 'Combustible de cocina eliminado correctamente'});
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