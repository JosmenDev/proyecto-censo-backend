import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class AbastecimientoAgua extends Model {};

AbastecimientoAgua.init( {
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
    modelName: 'AbastecimientoAgua',
    tableName: 'abastecimiento_agua',
    freezeTableName: true,
    timestamps: true
});

export default AbastecimientoAgua;