import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class SeguroSalud extends Model {};

SeguroSalud.init ( {
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
    modelName: 'SeguroSalud',
    tableName: 'seguro_salud',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate(seguroSalud) {
            if (typeof seguroSalud.nombre === 'string') {
                seguroSalud.nombre = seguroSalud.nombre.trim();
            }
        }
    }
});

export default SeguroSalud;