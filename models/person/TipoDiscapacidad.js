import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class TipoDiscapacidad extends Model {};

TipoDiscapacidad.init ( {
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
    modelName: 'TipoDiscapacidad',
    tableName: 'tipo_discapacidad',
    freezeTableName: true,
    timestamps: true
});

export default TipoDiscapacidad;