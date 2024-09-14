import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class ServicioHigienico extends Model {};

ServicioHigienico.init( {
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
    modelName: 'ServicioHigienico',
    tableName: 'servicio_higienico',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(servicioHigienico) {
            if (typeof servicioHigienico.nombre === 'string') {
                servicioHigienico.nombre = servicioHigienico.nombre.trim();
            }
        }
    }
});

export default ServicioHigienico;