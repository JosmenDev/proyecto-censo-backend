import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class CombustibleCocina extends Model {};

CombustibleCocina.init( {
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
        allowNull: true,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'CombustibleCocina',
    tableName: 'combustible_cocina',
    freezeTableName: true,
    timestamps: true
});

export default CombustibleCocina;