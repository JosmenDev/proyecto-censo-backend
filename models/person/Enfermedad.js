import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class Enfermedad extends Model {};

Enfermedad.init( {
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
    modelName: 'Enfermedad',
    tableName: 'enfermedad',
    freezeTableName: true,
    timestamps: true
});

export default Enfermedad;