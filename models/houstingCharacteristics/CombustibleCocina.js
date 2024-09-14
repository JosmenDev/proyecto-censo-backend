import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class CombustibleCocina extends Model {};

CombustibleCocina.init( {
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
    modelName: 'CombustibleCocina',
    tableName: 'combustible_cocina',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(combustibleCocina) {
            if (typeof combustibleCocina.nombre === 'string') {
                combustibleCocina.nombre = combustibleCocina.nombre.trim();
            }
        }
    }
});

export default CombustibleCocina;