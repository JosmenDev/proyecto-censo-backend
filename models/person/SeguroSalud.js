import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class SeguroSalud extends Model {};

SeguroSalud.init ( {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
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
    modelName: 'SeguroSalud',
    tableName: 'seguro_salud',
    freezeTableName: true,
    timestamps: true
});

export default SeguroSalud;