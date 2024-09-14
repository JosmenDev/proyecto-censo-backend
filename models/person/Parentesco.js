import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class Parentesco extends Model {};

Parentesco.init ( {
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
}, {
    sequelize: db,
    modelName: 'Parentesco',
    tableName: 'parentesco',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(parentesco) {
            if (typeof parentesco.nombre === 'string') {
                parentesco.nombre = parentesco.nombre.trim();
            }
        }
    }
});

export default Parentesco;