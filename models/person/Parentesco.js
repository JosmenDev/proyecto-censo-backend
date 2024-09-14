import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class Parentesco extends Model {};

Parentesco.init ( {
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
    modelName: 'Parentesco',
    tableName: 'parentesco',
    freezeTableName: true,
    timestamps: true
});

export default Parentesco;