import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class Religion extends Model {};

Religion.init ( {
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
},{
    sequelize: db,
    modelName: 'Religion',
    tableName: 'religion',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(religion) {
            if (typeof religion.nombre === 'string') {
                religion.nombre = religion.nombre.trim();
            }
        }
    }
});

export default Religion;

