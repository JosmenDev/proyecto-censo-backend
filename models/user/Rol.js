import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class Rol extends Model {};

Rol.init ( {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    modelName: 'Rol',
    tableName: 'rol',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(rol) {
            if (typeof rol.nombre === 'string') {
                rol.nombre = rol.nombre.trim();
            }
        }
    }
});

export default Rol;