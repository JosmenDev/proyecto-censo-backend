import { DataTypes, Model } from "sequelize";
import generarId from "../../helpers/generarId.js";
import db from "../../config/db.js";
import LocalizacionVivienda from "../housingLocation/LocalizacionVivienda.js";
import MaterialVivienda from "./MaterialVivienda.js";
import AbastecimientoAgua from "./AbastecimientoAgua.js";
import ServicioHigienico from "./ServicioHigienico.js";
import CombustibleCocina from "./CombustibleCocina.js";
import Cloracion from "./Cloracion.js";
import DisposicionBasura from "./DisposicionBasura.js";
import { v4 as uuid4 } from 'uuid';

class CaracteristicasVivienda extends Model {};

CaracteristicasVivienda.init ( {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid4
    },
    idlocalizacion_vivienda: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'LocalizacionVivienda',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    idmaterial_vivienda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'MaterialVivienda',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    otro_material: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    idabastecimiento_agua: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'AbastecimientoAgua',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    otro_abastecimiento: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    idservicio_higienico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ServicioHigienico',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    otro_servicio: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    nro_habitaciones: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    idcombustible_cocina: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CombustibleCocina',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    otro_combustible: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    idcloracion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Cloracion',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    iddisposicion_basura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'DisposicionBasura',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    otro_disposicion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    tenencia_canes: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    almacena_agua_vivienda: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: db,
    modelName: 'CaracteristicasVivienda',
    tableName: 'caracteristicas_vivienda',
    freezeTableName: true,
    timestamps: true
});

CaracteristicasVivienda.belongsTo(MaterialVivienda, {
    foreignKey: 'idmaterial_vivienda',
    as: 'MaterialVivienda'
});

CaracteristicasVivienda.belongsTo(AbastecimientoAgua, {
    foreignKey: 'idabastecimiento_agua',
    as: 'AbastecimientoAgua'
});

CaracteristicasVivienda.belongsTo(ServicioHigienico, {
    foreignKey: 'idservicio_higienico',
    as: 'ServicioHigienico'
});

CaracteristicasVivienda.belongsTo(CombustibleCocina, {
    foreignKey: 'idcombustible_cocina',
    as: 'CombustibleCocina'
}); 

CaracteristicasVivienda.belongsTo(Cloracion, {
    foreignKey: 'idcloracion',
    as: 'Cloracion'
});

CaracteristicasVivienda.belongsTo(DisposicionBasura, {
    foreignKey: 'iddisposicion_basura',
    as: 'DisposicionBasura'
});

CaracteristicasVivienda.belongsTo(LocalizacionVivienda, {
    foreignKey: 'idlocalizacion_vivienda',
    as: 'LocalizacionVivienda'
});

LocalizacionVivienda.hasMany(CaracteristicasVivienda, {
    foreignKey: 'idlocalizacion_vivienda',
    as: 'CaracteristicasVivienda'
});

export default CaracteristicasVivienda;