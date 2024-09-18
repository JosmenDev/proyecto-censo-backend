import { respondWithError, respondWithServerError } from "../../helpers/errors.js";
import db from "../../config/db.js";
// Modelo Ficha Familiar y requerimientos
import LocalizacionVivienda from "../../models/housingLocation/LocalizacionVivienda.js";
import CaracteristicasVivienda from "../../models/houstingCharacteristics/CaracteristicasVivienda.js";
import FichaFamiliar from "../../models/familyRecord/FichaFamilar.js";
import ItemProteccion from "../../models/houstingCharacteristics/ItemProteccion.js";
import Empleado from "../../models/user/Empleado.js";
import MaterialVivienda from "../../models/houstingCharacteristics/MaterialVivienda.js";
import Sector from "../../models/housingLocation/Sector.js";
import CentroPoblado from "../../models/housingLocation/CentroPoblado.js";
import AbastecimientoAgua from "../../models/houstingCharacteristics/AbastecimientoAgua.js";
import ServicioHigienico from "../../models/houstingCharacteristics/ServicioHigienico.js";
import DisposicionBasura from "../../models/houstingCharacteristics/DisposicionBasura.js";
import Cloracion from "../../models/houstingCharacteristics/Cloracion.js";
import CombustibleCocina from "../../models/houstingCharacteristics/CombustibleCocina.js";
import MedidaProteccion from "../../models/houstingCharacteristics/MedidaProteccion.js";

const agregarRegistro = async (req, res) => {
    // Para realizar multiples operaciones
    const transaction = await db.transaction();
    try {
        const {
            fecha_ficha,
            resultado_aplicacion,
            apellidos_familia,
            localizacion,
            caracteristicas,
            medidas_proteccion,
        } = req.body;
        const idempleado = req.usuario.empleado.id;

        // Agregar Ficha Familiar
        const nuevaFichaFamiliar = await FichaFamiliar.create({
            fecha_ficha,
            idempleado,
            resultado_aplicacion,
            apellidos_familia
        }, { transaction });

        // Agregar Localización de Vivienda
        const nuevaLocalizacionVivienda = await LocalizacionVivienda.create({
            idficha_familiar: nuevaFichaFamiliar.id,
            ...localizacion
        }, {transaction});

        // Agregar Caracteristicas de Vivienda
        const nuevaCaracteristicasVivienda = await CaracteristicasVivienda.create( {
            idlocalizacion_vivienda: nuevaLocalizacionVivienda.id,
            ...caracteristicas
        }, {transaction});

        if (medidas_proteccion && medidas_proteccion.length > 0) {
            const itemsProteccion = medidas_proteccion.map( medida => ({
                idcaracteristicas_vivienda: nuevaCaracteristicasVivienda.id,
                idmedidas_proteccion: medida.id,
                valor: medida.valor
            }));

            await ItemProteccion.bulkCreate(itemsProteccion, {transaction});
        }

        // Confirmamos la transaccion
        await transaction.commit();

        // Devolver una respuesta exitosa
        res.json({
            msg: 'Ficha Familiar agregada correctamente',
            fichaFamiliar: nuevaFichaFamiliar,
            localizacionVivienda: nuevaLocalizacionVivienda,
            caracteristicasVivienda: nuevaCaracteristicasVivienda,
            itemsProteccion: medidas_proteccion
        });
        
    } catch (error) {
        // revertir transaccion
        await transaction.rollback();
        respondWithServerError(res, error);
    }
}

const listarRegistros = async (req, res) => {
    try {
        const listadoFichas = await FichaFamiliar.findAll(
            {where: {estado: true}, 
            include: [{model: Empleado, as: 'Empleado'}]});
        res.json(listadoFichas);
    } catch (error) {
        respondWithServerError(res, error);
    }
}

const obtenerRegistro = async (req, res) => {
    
    const {id} = req.params;
    try {
        const fichaFamilar = await FichaFamiliar.findOne( 
            {where: {id},
            include:[
                {model: LocalizacionVivienda, as: 'LocalizacionVivienda',
                include: [
                    {model: Sector, as: 'Sector'},
                    {model: CentroPoblado, as: 'CentroPoblado'},
                    {model: CaracteristicasVivienda, as: 'CaracteristicasVivienda',
                        include: [
                            {model: MaterialVivienda, as: 'MaterialVivienda'},
                            {model: AbastecimientoAgua, as: 'AbastecimientoAgua'},
                            {model: ServicioHigienico, as: 'ServicioHigienico'},
                            {model: DisposicionBasura, as: 'DisposicionBasura'},
                            {model: Cloracion, as: 'Cloracion'},
                            {model: CombustibleCocina, as: 'CombustibleCocina'},
                            {model: MedidaProteccion, as: 'MedidasProteccion'}
                        ]
                    }
                ]}
            ]}
        )
        if (!fichaFamilar) {
            return respondWithError(res, 404, 'Ficha familiar no encontrada');
        }
        res.json(fichaFamilar.LocalizacionVivienda[0].CaracteristicasVivienda[0].MedidasProteccion);
    } catch (error) {
        respondWithServerError(res, error);
    }
}

const actualizarRegistro = async (req, res) => {
    const {id} = req.params;
    const {fecha_ficha, resultado_aplicacion, apellidos_familia, localizacion, caracteristicas, medidas_proteccion } = req.body;
    const {ubicacion_geografica, idsector, idcentro_poblado, longitud, latitud, direccion, referencia, nro_piso, nro_familias, nro_vivienda} = localizacion;
    const {idmaterial_vivienda, idabastecimiento_agua, idservicio_higienico, nro_habitaciones, idcombustible_cocina, idcloracion, iddisposicion_basura, tenencia_canes, almacena_agua_vivienda} = caracteristicas;

    const transaction = await db.transaction();
    
    try {
        const fichaFamiliar = await FichaFamiliar.findOne( 
            {where: {id},
            include:[
                {model: LocalizacionVivienda, as: 'LocalizacionVivienda',
                include: [
                    {model: CaracteristicasVivienda, as: 'CaracteristicasVivienda',
                        include: [
                            {model: MedidaProteccion, as: 'MedidasProteccion'}
                        ]
                    }
                ]}
            ]}, {transaction}
        );
        if (!fichaFamiliar) {
            return respondWithError(res, 404, 'Ficha Familiar no encontrada');
        }
        // Actualizar datos de ficha familiar
        fichaFamiliar.fecha_ficha = (fecha_ficha !== undefined) ? fecha_ficha : fichaFamiliar.fecha_ficha;
        fichaFamiliar.resultado_aplicacion = (resultado_aplicacion !== undefined) ? resultado_aplicacion : fichaFamiliar.resultado_aplicacion;
        fichaFamiliar.apellidos_familia = (apellidos_familia !== undefined) ? apellidos_familia : fichaFamiliar.apellidos_familia;

        // Actualizar datos de localización vivienda
        const localizacionVivienda = fichaFamiliar.LocalizacionVivienda[0];
        localizacionVivienda.ubicacion_geografica = (ubicacion_geografica !== undefined) ? ubicacion_geografica : localizacionVivienda.ubicacion_geografica;
        localizacionVivienda.idsector = (idsector !== undefined) ? idsector : localizacionVivienda.idsector;
        localizacionVivienda.idcentro_poblado = (idcentro_poblado !== undefined) ? idcentro_poblado : localizacionVivienda.idcentro_poblado;
        localizacionVivienda.longitud = (longitud !== undefined) ? longitud : localizacionVivienda.longitud;
        localizacionVivienda.latitud = (latitud !== undefined) ? latitud : localizacionVivienda.latitud;
        localizacionVivienda.direccion = (direccion !== undefined) ? direccion : localizacionVivienda.direccion;
        localizacionVivienda.referencia = (referencia !== undefined) ? referencia : localizacionVivienda.referencia;
        localizacionVivienda.nro_piso = (nro_piso !== undefined) ? nro_piso : localizacionVivienda.nro_piso;
        localizacionVivienda.nro_familias = (nro_familias !== undefined) ? nro_familias : localizacionVivienda.nro_familias;
        localizacionVivienda.nro_vivienda = (nro_vivienda !== undefined) ? nro_vivienda : localizacionVivienda.nro_vivienda;

        // Actualizar datos de características vivienda
        const caracteristicasVivienda = localizacionVivienda.CaracteristicasVivienda[0];
        caracteristicasVivienda.idmaterial_vivienda = (idmaterial_vivienda !== undefined) ? idmaterial_vivienda : caracteristicasVivienda.idmaterial_vivienda;
        caracteristicasVivienda.idabastecimiento_agua = (idabastecimiento_agua !== undefined) ? idabastecimiento_agua : caracteristicasVivienda.idabastecimiento_agua;
        caracteristicasVivienda.idservicio_higienico = (idservicio_higienico !== undefined) ? idservicio_higienico : caracteristicasVivienda.idservicio_higienico;
        caracteristicasVivienda.nro_habitaciones = (nro_habitaciones !== undefined) ? nro_habitaciones : caracteristicasVivienda.nro_habitaciones;
        caracteristicasVivienda.idcombustible_cocina = (idcombustible_cocina !== undefined) ? idcombustible_cocina : caracteristicasVivienda.idcombustible_cocina;
        caracteristicasVivienda.idcloracion = (idcloracion !== undefined) ? idcloracion : caracteristicasVivienda.idcloracion;
        caracteristicasVivienda.iddisposicion_basura = (iddisposicion_basura !== undefined) ? iddisposicion_basura : caracteristicasVivienda.iddisposicion_basura;
        caracteristicasVivienda.tenencia_canes = (tenencia_canes !== undefined) ? tenencia_canes : caracteristicasVivienda.tenencia_canes;
        caracteristicasVivienda.almacena_agua_vivienda = (almacena_agua_vivienda !== undefined) ? almacena_agua_vivienda : caracteristicasVivienda.almacena_agua_vivienda;


        // Guardar cambios
        await fichaFamiliar.save({transaction});
        await localizacionVivienda.save({transaction});
        await caracteristicasVivienda.save({transaction});


        // Actualizar medidas de proteccion
        if (medidas_proteccion && medidas_proteccion > 0) {
            
            await ItemProteccion.destroy({where: {idcaracteristicas_vivienda: caracteristicasVivienda.id}, transaction});

            const listadoItemProteccion = medidas_proteccion.map(medida => ({
                idmedidas_proteccion : medida.id,
                valor : medida.valor
            }));
            await ItemProteccion.bulkCreate(listadoItemProteccion, {transaction});
        }
        
        
        // Confirmar transaccion
        await transaction.commit();
        
        res.json({msg: 'Ficha familiar Actualizada correctamente', fichaFamiliar});
    } catch (error) {
        await transaction.rollback();
        respondWithServerError(res, error);
    }
}

const eliminarRegistro = async (req, res) => {
    const { id } = req.params;
    const transaction = await db.transaction();
    try {
        const fichaFamiliar = await FichaFamiliar.findByPk(id, { transaction });
        if (!fichaFamiliar) {
            await transaction.rollback();
            return respondWithError(res, 404, 'Ficha Familiar no encontrada');
        }
        const localizacionVivienda = await LocalizacionVivienda.findOne({ where: { idficha_familiar: id }, transaction});

        // Actualizar el estado
        await fichaFamiliar.update({ estado: false }, { transaction });
        await localizacionVivienda.update({ estado: false }, { transaction });
        await transaction.commit();
        res.json({ msg: 'Ficha Familiar eliminada correctamente' });

    } catch (error) {
        await transaction.rollback();
        respondWithServerError(res, error);
    }
};

export {
    agregarRegistro,
    listarRegistros,
    obtenerRegistro,
    actualizarRegistro,
    eliminarRegistro
}