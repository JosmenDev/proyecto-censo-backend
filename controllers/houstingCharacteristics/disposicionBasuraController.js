import DisposicionBasura from "../../models/houstingCharacteristics/DisposicionBasura.js";

const agregarRegistro = async (req, res) => {
    const { nombre } = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        await DisposicionBasura.create(req.body);
        res.json({msg: 'Disposición de basura agregado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarDisposicionesBasura = await DisposicionBasura.findAll({where:{
            estado: 1
        }})
        res.json(listarDisposicionesBasura);
    } catch (error) {
        respondWithServerError(res, error);
    }
};  

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const disposicionBasura = await DisposicionBasura.findByPk(id);
        if (!disposicionBasura) {
            return respondWithError(res, 404, 'Disposición de basura no encontrado');
        }
        res.json(disposicionBasura);
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
        const disposicionBasura = await DisposicionBasura.findByPk(id);
        if (!disposicionBasura) {
            return respondWithError(res, 404, 'Disposición de basura no encontrado');
        }
        // Actualiza
        disposicionBasura.nombre = req.body.nombre || disposicionBasura.nombre;
        await disposicionBasura.save();
        res.json({msg: 'Disposición de basura actualizado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const disposicionBasura = await DisposicionBasura.findByPk(id);
        if (!disposicionBasura) {
            return respondWithError(res, 404, 'Ocupación no encontrada');
        }
        disposicionBasura.estado = false;
        await disposicionBasura.save();
        res.json({msg: 'Disposición de basura eliminado correctamente'});
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