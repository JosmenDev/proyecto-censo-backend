import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class AccionEmergencia extends Model {};

AccionEmergencia.init ( {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim(value) {
                if (typeof value === 'String') {
                    this.setDataValue('nombre', value.trim());
                }
            }
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
    timestamps: true
});

export default AccionEmergencia;