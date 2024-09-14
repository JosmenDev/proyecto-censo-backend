import { respondWithError, respondWithServerError } from "../../helpers/errors.js"; "../helpers/errors.js";
import Cargo from "../../models/user/Cargo.js";
import Empleado from "../../models/user/Empleado.js";

const agregarRegistro = async (req, res) => {

    const { dni } = req.body;
    try {
        // req.body permite leer los request
        const existeUsuario = await Empleado.findOne({ where: { dni }});
        if (existeUsuario) {
            return respondWithError(res, 409, 'El empleado ya está registrado');
        }

        await Empleado.create(req.body);
        res.json({msg: 'Empleado registrado correctamente'});
    } catch (error) {
        respondWithServerError(res, error);
    }
    
};

const listarRegistros = async(req, res) => {
    try {
        const listadoEmpleados = await Empleado.findAll({
            where: {estado: true},
            include: { model: Cargo, as: 'Cargo', attributes: ['nombre'] }
        })
        res.json(listadoEmpleados);
    } catch (error) {
        respondWithServerError(res, error);
    }
}

const obtenerRegistro = async(req, res) => {

    const { id } = req.params;
    try {
        const empleado = await Empleado.findByPk(id, {
            include: {model: Cargo, as: 'Cargo', attributes: ['nombre']}
        });
        if (!empleado) {
            return respondWithError(res, 404, 'Empleado no encontrado');
        }
        res.json(empleado);
    } catch (error) {
        respondWithServerError(res, error);
    }
    
}

const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    const { dni, nombre, apellidos, idcargo } = req.body;
    try {
        const empleado = await Empleado.findByPk(id);
        if (!empleado) {
            return respondWithError(res, 404, 'Empleado no encontrado');
        }
        if (dni && dni !==empleado.dni) {
            const dniExistente = await Empleado.findOne({where: {dni}});
            if (dniExistente) {
                return respondWithError(res, 409, 'El DNI ya está registrado');
            }
        }
        empleado.dni = dni || empleado.dni;
        empleado.nombre = nombre || empleado.nombre;
        empleado.apellidos = apellidos || empleado.apellidos;
        empleado.idcargo = idcargo || empleado.idcargo;
        await empleado.save();
        res.json({msg: 'Empleado actualizado correctamente'});

    } catch (error) {
        respondWithServerError(res, error);
    }
}

const desactivarRegistro = async(req, res) => {
    const { id } = req.params;
    try {
        const empleado = await Empleado.findByPk(id);
        if (!empleado) {
            return respondWithError(res, 404, 'Empleado no encontrado');
        }
        empleado.estado = false;
        await empleado.save();
        res.json({msg: 'Empleado eliminado correctamente'});
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