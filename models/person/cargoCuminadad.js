import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class CargoComunidad extends Model {};

CargoComunidad.init( {
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
        allowNull: true,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'CargoComunidad',
    tableName: 'cargo_comunidad',
    freezeTableName: true,
    timestamps: true
});

export default CargoComunidad;