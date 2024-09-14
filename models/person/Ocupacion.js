import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class Ocupacion extends Model {};

Ocupacion.init( {
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
    modelName: 'Ocupacion',
    tableName: 'ocupacion',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(ocupacion) {
            if (typeof ocupacion.nombre === 'string') {
                ocupacion.nombre = ocupacion.nombre.trim();
            }
        }
    }
});

export default Ocupacion;