import DisposicionBasura from "../../models/houstingCharacteristics/DisposicionBasura.js";
import {respondWithError, respondWithServerError} from '../../helpers/errors.js';

const agregarRegistro = async (req, res) => {
    try {
        const nuevaDisposicionBasura = await DisposicionBasura.create(req.body);
        res.json(nuevaDisposicionBasura);
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
    try {
        const disposicionBasura = await DisposicionBasura.findByPk(id);
        if (!disposicionBasura) {
            return respondWithError(res, 404, 'Disposición de basura no encontrado');
        }
        // Actualiza
        disposicionBasura.nombre = req.body.nombre || disposicionBasura.nombre;
        const disposicionBasuraActualizada =  await disposicionBasura.save();
        res.json(disposicionBasuraActualizada);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const {id} = req.params;
    try {
        const disposicionBasura = await DisposicionBasura.findByPk(id);
        if (!disposicionBasura) {
            return respondWithError(res, 404, 'Disposición de basura no encontrada');
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