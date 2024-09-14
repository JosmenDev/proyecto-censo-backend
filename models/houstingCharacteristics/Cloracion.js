import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class Cloracion extends Model {};

Cloracion.init( {
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
    modelName: 'Cloracion',
    tableName: 'cloracion',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(cloracion) {
            if (typeof cloracion.nombre === 'string') {
                cloracion.nombre = cloracion.nombre.trim();
            }
        }
    }
});

export default Cloracion;