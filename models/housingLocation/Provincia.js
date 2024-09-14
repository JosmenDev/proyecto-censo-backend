import { DataTypes, Model } from "sequelize";
import db from "../../config/db.js";
import Departamento from "./Departamento.js";

class Provincia extends Model {};

Provincia.init( {
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
    iddepartamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Region',
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'Provincia',
    tableName: 'provincia',
    freezeTableName: true,
    timestamps: true
});

Provincia.belongsTo( Departamento, {
    foreignKey: 'iddepartamento',
    as: 'Departamento'
});

export default Provincia;
