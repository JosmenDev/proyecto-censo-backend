import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";

class Departamento extends Model {};

Departamento.init( {
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
    modelName: 'Departamento',
    tableName: 'departamento',
    freezeTableName: true,
    timestamps: true
});

export default Departamento;
