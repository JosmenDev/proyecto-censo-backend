import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class DisposicionBasura extends Model {};

DisposicionBasura.init( {
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
    modelName: 'DisposicionBasura',
    tableName: 'disposicion_basura',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(disposicionBasura) {
            if (typeof disposicionBasura.nombre === 'string') {
                disposicionBasura.nombre = disposicionBasura.nombre.trim();
            }
        }
    }
});

export default DisposicionBasura;