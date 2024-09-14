import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class TipoDiscapacidad extends Model {};

TipoDiscapacidad.init ( {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'TipoDiscapacidad',
    tableName: 'tipo_discapacidad',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(tipoDiscapacidad) {
            if (typeof tipoDiscapacidad.nombre === 'string') {
                tipoDiscapacidad.nombre = tipoDiscapacidad.nombre.trim();
            }
        }
    }
});

export default TipoDiscapacidad;