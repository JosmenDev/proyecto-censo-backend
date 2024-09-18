import { DataTypes, Model } from "sequelize";
import generarId from "../../helpers/generarId.js";
import db from "../../config/db.js";
import FichaFamiliar from "../familyRecord/FichaFamilar.js";
import Sector from "./Sector.js";
import CentroPoblado from "./CentroPoblado.js";
import { v4 as uuid4 } from 'uuid';

class LocalizacionVivienda extends Model {};

LocalizacionVivienda.init( {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid4
    },
    idficha_familiar: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'FichaFamiliar',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    ubicacion_geografica: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    idsector: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sector',
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    idcentro_poblado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: 'CentroPoblado',
            key: 'id'
        }
    },
    longitud: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    latitud: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    referencia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nro_piso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    },
    nro_familias: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    },
    nro_vivienda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'LocalizacionVivienda',
    tableName: 'localizacion_vivienda',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(localizacionVivienda) {
            const { direccion, referencia } = localizacionVivienda;
            if (typeof direccion === 'string') {
                localizacionVivienda.direccion = direccion.trim();
            }
            if (typeof referencia === 'string') {
                localizacionVivienda.referencia = referencia.trim();
            }
        }
    }
});

LocalizacionVivienda.belongsTo(Sector, {
    foreignKey: 'idsector',
    as: 'Sector'
});

Sector.hasMany(LocalizacionVivienda, {
    foreignKey: 'idsector',
    as: 'Viviendas'
});

LocalizacionVivienda.belongsTo(CentroPoblado, {
    foreignKey: 'idcentro_poblado',
    as: 'CentroPoblado'
});

LocalizacionVivienda.belongsTo(FichaFamiliar, {
    foreignKey: 'idficha_familiar',
    as: 'FichaFamiliar'
});

FichaFamiliar.hasMany(LocalizacionVivienda, {
    foreignKey: 'idficha_familiar',
    as: 'LocalizacionVivienda'
});

export default LocalizacionVivienda;