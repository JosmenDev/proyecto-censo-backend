import Departamento from "../../models/housingLocation/Departamento.js";
import Provincia from "../../models/housingLocation/Provincia.js";

const agregarRegistro = async (req, res) => {
    const { nombre, iddepartamento } = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        if (!iddepartamento) {
            return respondWithError(res, 400, 'El campo "departamento" es obligatorio');
        }
        await Provincia.create(req.body);
        res.json({msg: 'Provincia agregada correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const listarRegistros = async (req, res) => {
    try {
        const listarProvincias = await Provincia.findAll({
            where: {
                estado: true
            },
            include: [{ model: Departamento, as: 'departamento' }]
        });
        res.json(listarProvincias);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const obtenerRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const provincia = await Provincia.findByPk(id, {
            include: [{ model: Departamento, as: 'departamento' }]
        });
        if (!provincia) {
            return respondWithError(res, 404, 'Provincia no encontrada');
        }
        res.json(provincia);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    const { nombre, iddepartamento } = req.body;
    try {
        if (!nombre) {
            return respondWithError(res, 400, 'El campo "nombre" es obligatorio');
        }
        if (!iddepartamento) {
            return respondWithError(res, 400, 'El campo "departamento" es obligatorio');
        }
        const provincia = await Provincia.findByPk(id);
        if (!provincia) {
            return respondWithError(res, 404, 'Provincia no encontrada');
        }
        provincia.nombre = req.body.nombre || provincia.nombre;
        provincia.iddepartamento = req.body.iddepartamento || provincia.iddepartamento;
        await provincia.save();
        res.json({msg: 'Provincia actualizada correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        const provincia = await Provincia.findByPk(id);
        if (!provincia) {
            return respondWithError(res, 404, 'Provincia no encontrada');
        }
        provincia.estado = false;
        await provincia.save();
        res.json({msg: 'Provincia eliminada correctamente'});
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
};
