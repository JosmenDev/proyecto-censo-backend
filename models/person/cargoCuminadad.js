import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class CargoComunidad extends Model {};

CargoComunidad.init( {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'CargoComunidad',
    tableName: 'cargo_comunidad',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(cargoComunidad) {
            if (typeof cargoComunidad.nombre === 'string') {
                cargoComunidad.nombre = cargoComunidad.nombre.trim();
            }
        }
    }
});

export default CargoComunidad;