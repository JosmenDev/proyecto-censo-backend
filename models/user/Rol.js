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
    modelName: 'Rol',
    tableName: 'rol',
    freezeTableName: true,
    timestamps: true,

});

export default Rol;