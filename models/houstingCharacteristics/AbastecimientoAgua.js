import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class AbastecimientoAgua extends Model {};

AbastecimientoAgua.init( {
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
    modelName: 'AbastecimientoAgua',
    tableName: 'abastecimiento_agua',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(abatecimientoAgua) {
            if (typeof abatecimientoAgua.nombre === 'string') {
                abatecimientoAgua.nombre = abatecimientoAgua.nombre.trim();
            }
        }
    }
});

export default AbastecimientoAgua;