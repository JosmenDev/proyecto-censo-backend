import db from "../../config/db.js";
import { respondWithServerError } from "../../helpers/errors.js";
// Modelo persona y requerimientos
import Persona from "../../models/person/Persona.js";
import AntecedentesRiesgo from "../../models/person/AntecedentesRiesgo.js";
import MediosInfoPersona from "../../models/person/MediosInfoPersona.js";
import Parentesco from "../../models/person/Parentesco.js";
import Religion from "../../models/person/Religion.js";
import NivelEducativo from "../../models/person/NivelEducativo.js";
import Ocupacion from "../../models/person/Ocupacion.js";
import CargoComunidad from "../../models/person/cargoCuminadad.js";
import SeguroSalud from "../../models/person/SeguroSalud.js";
import TipoDiscapacidad from "../../models/person/TipoDiscapacidad.js";
import AccionEmergencia from "../../models/person/AccionEmergencia.js";
import GrupoEtnico from "../../models/person/GrupoEtnico.js";
import MedioInformacion from "../../models/person/MedioInformacion.js";
import Enfermedad from "../../models/person/Enfermedad.js";

// Modelo Persona
const agregarRegistroPersona = async(req, res) => {
    const {id} = req.params;
    const {datosPersona, datosAntecedentesRiesgo, datosMediosInformacion} = req.body;
    const transaction = await db.transaction();
    try {
        const persona = await Persona.create({
            idficha_familiar: id, ...datosPersona
        }, {transaction});

        const listadoAntecedentesRiesgos = datosAntecedentesRiesgo.map(item => ( {
            idpersona: persona.id,
            idenfermedad: item.idenfermedad,
            otro_descripcion: item.otro_descripcion || null,
            diagnostico_dx: item.diagnostico_dx,
            riesgo_r: item.riesgo_r
        }));
        const antecedentesRiesgos = await AntecedentesRiesgo.bulkCreate(listadoAntecedentesRiesgos, {transaction});

        const listadoMediosInformacion = datosMediosInformacion.map( item => ( {
            idpersona: persona.id,
            idmedios_informacion: item.id
        }))
        const mediosInformacion = await MediosInfoPersona.bulkCreate(listadoMediosInformacion, {transaction});

        // Confirmar los cambios si todo va bien
        await transaction.commit();
        res.json({msg: 'Persona agregada correctamente', persona, antecedentesRiesgos, mediosInformacion});

    } catch (error) {
        await transaction.rollback();
        respondWithServerError(res, error);
    }
};

const listarRegistrosPersona = async (req, res) => {
    const { id } = req.params
    try {
        const listadoPersonas = await Persona.findAll( {
            where: {idficha_familiar: id, estado: true},
            include: [
                {model: Parentesco, as: 'Parentesco'},
                {model: Religion, as: 'Religion'},
                {model: NivelEducativo, as: 'NivelEducativo'},
                {model: Ocupacion, as: 'Ocupacion'},
                {model: Religion, as: 'Religion'},
                {model: CargoComunidad, as: 'CargoComunidad'},
                {model: SeguroSalud, as: 'SeguroSalud'},
                {model: TipoDiscapacidad, as: 'TipoDiscapacidad'},
                {model: AccionEmergencia, as: 'AccionEmergencia'},
                {model: GrupoEtnico, as: 'GrupoEtnico'},
                {model: MedioInformacion, as: 'MediosInformacion'},
                {model: Enfermedad, as: 'Enfermedades'},
            ]    

        })
        res.json(listadoPersonas);
    } catch (error) {
        respondWithServerError(res, error);
    }
}

const obtenerRegistroPersona = async(req, res) => {
    const { id, idPersona } = req.params
    try {
        const listadoPersonas = await Persona.findOne( {
            where: {idficha_familiar: id, id: idPersona, estado: true},
            include: [
                {model: Parentesco, as: 'Parentesco'},
                {model: Religion, as: 'Religion'},
                {model: NivelEducativo, as: 'NivelEducativo'},
                {model: Ocupacion, as: 'Ocupacion'},
                {model: Religion, as: 'Religion'},
                {model: CargoComunidad, as: 'CargoComunidad'},
                {model: SeguroSalud, as: 'SeguroSalud'},
                {model: TipoDiscapacidad, as: 'TipoDiscapacidad'},
                {model: AccionEmergencia, as: 'AccionEmergencia'},
                {model: GrupoEtnico, as: 'GrupoEtnico'},
                {model: MedioInformacion, as: 'MediosInformacion'},
                {model: Enfermedad, as: 'Enfermedades'},
            ]    

        })
        res.json(listadoPersonas);
    } catch (error) {
        respondWithServerError(res, error);
    }
};

const actualizarRegistroPersona = async(req, res) => {
    
    const { idPersona } = req.params
    const { datosPersona, datosAntecedentesRiesgo, datosMediosInformacion } = req.body;
    const transaction = await db.transaction();
    try {
        // Actualizar persona
        const persona = await Persona.findByPk(idPersona);
        if (!persona) {
            return respondWithError(res, 404, 'Persona no encontrada');
        }
        await persona.update(datosPersona, { transaction });

        // Actualizar Antecedentes de Riesgo
        await AntecedentesRiesgo.destroy({ where: { idPersona }, transaction });  // Elimina los antecedentes previos
        const listadoAntecedentesRiesgos = datosAntecedentesRiesgo.map(item => ({
            idpersona: idPersona,
            idenfermedad: item.idenfermedad,
            otro_descripcion: item.otro_descripcion || null,
            diagnostico_dx: item.diagnostico_dx,
            riesgo_r: item.riesgo_r
        }));
        const antecedentesRiesgos = await AntecedentesRiesgo.bulkCreate(listadoAntecedentesRiesgos, { transaction });

        // Actualizar Medios de Informacion
        // Actualizar medios de información
        await MediosInfoPersona.destroy({ where: { idPersona }, transaction });  // Elimina los medios de información previos
        const listadoMediosInformacion = datosMediosInformacion.map(item => ({
            idpersona: idPersona,
            idmedios_informacion: item.id
        }));
        const mediosInformacion = await MediosInfoPersona.bulkCreate(listadoMediosInformacion, { transaction });

        // Confirmar la transacción si todo está bien
        await transaction.commit();

        // Mensaje final
        res.json({
            msg: 'Persona actualizada correctamente',
            persona,
            antecedentesRiesgos,
            mediosInformacion
        });

    } catch (error) {
        respondWithServerError(res, error);
    }
};

const desactivarRegistroPersona = async(req, res) => {

    const { idPersona } = req.params; // ID de la persona a desactivar

    try {
        // Buscar la persona
        const persona = await Persona.findOne({ where: { id: idPersona } });
        if (!persona) {
            return respondWithError(res, 404, 'Persona no encontrada');
        }
        persona.estado = false;
        await persona.save();
        res.json({ msg: 'Persona desactivada correctamente' });
        
    } catch (error) {
        await transaction.rollback();
        respondWithServerError(res, error);
    }
};

export {
    agregarRegistroPersona,
    listarRegistrosPersona,
    obtenerRegistroPersona,
    actualizarRegistroPersona,
    desactivarRegistroPersona
}
