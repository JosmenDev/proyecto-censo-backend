import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class AccionEmergencia extends Model {};

AccionEmergencia.init ( {
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
    modelName: 'AccionEmergencia',
    tableName: 'accion_emergencia',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(accionEmergencia) {
            if (typeof accionEmergencia.nombre === 'string') {
                accionEmergencia.nombre = accionEmergencia.nombre.trim();
            }
        }
    }
});

export default AccionEmergencia;